import os
import shlex
import subprocess
from datetime import datetime

import open3d
from paramiko.client import SSHClient
from sqlalchemy.orm import Session

from app.config import get_settings
from app.db.crud.point_cloud import point_cloud_crud
from app.db.domains import ImageTypeValues
from app.db.models import PointCloud, Room
from app.helpers import get_cloud_path, create_storage_folder, get_generated_file_path, get_project_path, \
    get_cloud_folder_path, get_generated_folder_path, remove_folder, get_image_folder_path
from app.point_cloud.LocalScripts.camera_converter import read_image_positions, apply_matrix_to_pos, \
    write_image_positions, read_colmap_image_positions, read_colmap_camera_attributes, combine_image_camera, \
    filter_images
from app.point_cloud.LocalScripts.cloud_tools import read_cloud, remove_outliers, save_cloud, \
    cloud_to_file, cloud_to_las, cloud_to_plane_matrix, apply_matrix, las_to_potree
from app.point_cloud.LocalScripts.matrix_tools import update_matrix
from app.schemas.point_cloud import PointCloudOffset, PointCloudCreateIn
from app.schemas.point_cloud import PointCloudSearch
from app.tasks import celery

settings = get_settings()
remote = f"{settings.remote_user}@{settings.remote_address}"


def query_progress(ssh: SSHClient, pc: PointCloud):
    if not pc.slurm_id:
        return
    error_code, out, err = execute_remote_command(ssh, f"/usr/share/slurm/bin/sacct -np -j {pc.slurm_id} --format=State,Start,End,ExitCode -X")
    print(error_code)
    print(err)
    print(out)
    if error_code:
        return
    return out.strip().split("|")


def create_point_cloud(db: Session, pc_in: PointCloudCreateIn, created_by):
    pc = point_cloud_crud.create(db, obj_in=pc_in,
                                 exclude={"colmap_attributes"},
                                 manual={"colmap_attributes": pc_in.colmap_attributes.json(exclude_unset=True),
                                         "created_by_id": created_by})
    celery.init_remote_job.delay(pc.id, pc_in.colmap_attributes.to_attributes_str())
    return pc


def initialize_remote_job(db: Session, ssh: SSHClient, pc: PointCloud, colmap_attr_str):
    make_remote_folder(ssh, remote_point_cloud_folder(pc))
    copy_images_to_remote(pc)
    error_code, out, err = execute_remote_command(ssh, f"./submit.sh {pc.file_path} {colmap_attr_str}",
                                                  cwd=settings.remote_base_path, )
    if error_code:
        raise Exception(f"Failed to queue colmap job. Error: {err}")
    print(out)
    pc.queued_at = datetime.now()
    pc.slurm_state = "PENDING"
    pc.slurm_id = int(out.split(" ")[-1].strip())
    db.commit()


def remote_point_cloud_folder(pc: PointCloud):
    return os.path.join(get_settings().remote_base_path, pc.file_path)


def make_remote_folder(ssh: SSHClient, path: str):
    execute_remote_command(ssh, command=f"mkdir {path}")


def rsync(source, destination, remote, to_remote=True):
    if remote:
        source = source if to_remote else f"{remote}:{source}"
        destination = destination if not to_remote else f"{remote}:{destination}"
    command = f"rsync -r -v -e \"ssh -i /etc/laosysteem/{settings.remote_key_name}\" {source} {destination}"
    return subprocess.run(shlex.split(command))


def copy_images_to_remote(pc: PointCloud):
    local_image_path = get_image_folder_path(pc.room.file_path)
    folders = ['cctv', 'camera', 'mask']
    output = [
        rsync(os.path.join(local_image_path, folder), os.path.join(settings.remote_base_path, pc.file_path), remote) for
        folder in folders]
    for out in output:
        if out.returncode != 0:
            raise Exception('rsync failed', out.returncode)
    return output


def copy_result_from_remote(pc: PointCloud):
    remote_base = settings.remote_base_path
    project_base = get_project_path(pc.file_path)
    generated_base = get_generated_folder_path(pc.file_path)
    files = [
        [[remote_base, pc.file_path, "dense/0/fused.ply"], [project_base, "fused.ply"]],
        [[remote_base, pc.file_path, "output/images.txt"], [project_base, "images.txt"]],
        [[remote_base, pc.file_path, "output/cameras.txt"], [project_base, "cameras.txt"]],
        [[remote_base, f"slurm-{pc.slurm_id}.out"], [generated_base, "logs.txt"]]
    ]
    os.makedirs(os.path.join(project_base), exist_ok=True)
    os.makedirs(os.path.join(generated_base), exist_ok=True)
    output = []
    for file in files:
        output.append(rsync(os.path.join(*file[0]), os.path.join(*file[1]), remote, False))
    for out in output:
        if out.returncode != 0:
            raise Exception(f"rsync failed with code: {out.returncode}", out.stderr)
    return output


def execute_remote_command(client: SSHClient, command: str, environment=None, cwd: str = ""):
    if cwd:
        command = f"cd {cwd};{command}"
    print("Running command: ", command)
    stdin, stdout, stderr = client.exec_command(command, environment=environment)
    error_code = stderr.channel.recv_exit_status()
    out = stdout.read().decode("utf-8")
    err = stderr.read().decode("utf-8")
    stderr.channel.close()
    stdout.channel.close()
    return error_code, out, err


def set_point_cloud_offset(db: Session, pc: PointCloud, offset: PointCloudOffset):
    matrix = pc.matrix
    pc.matrix = update_matrix(matrix, offset.offset_x, offset.offset_y, offset.offset_z, offset.scale, offset.angle)
    update_point_cloud_project(pc)
    point_cloud_crud.commit(db, mdl_in=pc)


def update_point_cloud_project(pc: PointCloud, pcd=None):
    update_point_cloud(pc, pcd)
    update_image_positions(pc)


def update_point_cloud(pc: PointCloud, pcd=None):
    if not pcd:
        pcd = load_point_cloud(pc.file_path)
    pcd = apply_matrix(pcd, pc.matrix)
    if get_settings().app_env != "production":
        open3d.io.write_point_cloud(get_generated_file_path(pc.file_path, "sample.ply"), pcd)
    cloud_to_file(pcd, get_generated_file_path(pc.file_path, "down_sampled"))
    cloud_to_las(pcd, get_generated_file_path(pc.file_path, "temp.las"))
    las_to_potree(get_generated_file_path(pc.file_path, "temp.las"), get_generated_file_path(pc.file_path, "potree"))

    os.remove(get_generated_file_path(pc.file_path, "temp.las"))


def update_image_positions(pc: PointCloud):
    camera = load_image_positions(pc.file_path)
    cctv = load_image_positions(pc.file_path, "cctv_converted.csv")
    camera = apply_matrix_to_pos(camera, pc.matrix)
    cctv = apply_matrix_to_pos(cctv, pc.matrix)
    cctv_path = get_generated_file_path(pc.file_path, "cctv_positions.csv")
    camera_path = get_generated_file_path(pc.file_path, "camera_positions.csv")
    write_image_positions(cctv_path, cctv)
    write_image_positions(camera_path, camera)


def init_cloud_folder(pc: PointCloud):
    paths = [
        ["generated", str(pc.file_path)],
        ["projects", str(pc.file_path)]
    ]
    for path in paths:
        create_storage_folder(path)


def load_point_cloud(cloud_path, cloud_name="filtered.ply"):
    cloud_path = get_cloud_path(cloud_path, cloud_name)
    return read_cloud(cloud_path)


def load_image_positions(cloud_path, file_name="images_converted.csv"):
    file_path = os.path.join(get_project_path(cloud_path), file_name)
    return read_image_positions(file_path)


def init_new_cloud(db: Session, pc: PointCloud):
    print(f"Initializing point cloud {pc.id}")
    init_cloud_folder(pc)
    pcd = load_point_cloud(pc.file_path, cloud_name="fused.ply")
    pcd_filtered, _ = remove_outliers(pcd)
    pc.point_count = len(pcd_filtered.points)
    print(f"Point cloud point count {len(pcd_filtered.points)}")
    saved = save_cloud(pcd_filtered, get_cloud_path(pc.file_path))
    matrix, _ = cloud_to_plane_matrix(pcd_filtered)
    pc.matrix = matrix
    print("Initing images file")
    init_image_positions(pc)
    update_point_cloud_project(pc, pcd)
    point_cloud_crud.commit(db, mdl_in=pc)


def init_image_positions(pc: PointCloud):
    images = read_colmap_image_positions(os.path.join(get_project_path(pc.file_path), "images.txt"))
    cameras = read_colmap_camera_attributes(os.path.join(get_project_path(pc.file_path), "cameras.txt"))
    combined = combine_image_camera(images, cameras)
    cctv_names = os.listdir(get_image_folder_path(pc.room.file_path, ImageTypeValues.cctv))
    cctv, camera = filter_images(combined, cctv_names)
    print(cctv)
    cctv_path = os.path.join(get_project_path(pc.file_path), "cctv_converted.csv")
    camera_path = os.path.join(get_project_path(pc.file_path), "images_converted.csv")
    write_image_positions(cctv_path, cctv)
    write_image_positions(camera_path, camera)


def delete_folder_from_disc(point_cloud: PointCloud):
    remove_folder(get_cloud_folder_path(point_cloud.file_path))
    remove_folder(get_generated_folder_path(point_cloud.file_path))


def delete_room_point_clouds(db: Session, room: Room):
    # TODO if pointcloud slurm job running, cancel
    [delete_folder_from_disc(point_cloud) for point_cloud in room.point_clouds]
    _room_point_clouds = PointCloudSearch()
    _room_point_clouds.room_id = room.id
    room_point_clouds = point_cloud_crud.search(db, mdl_in=_room_point_clouds)

    for room_point_cloud in room_point_clouds:
        point_cloud_crud.delete(db, mdl_in=room_point_cloud)

