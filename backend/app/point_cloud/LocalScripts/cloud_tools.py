import os
import platform
import subprocess
from random import randint

import numpy as np
import open3d as o3d
import pylas
from numpy import ndarray


def read_cloud(path):
    """

    :param path:
    :return: open3d.geometry.PointCloud
    """
    return o3d.io.read_point_cloud(path)


def get_floor_plane(pcd: o3d.geometry.PointCloud, dist_threshold=0.01):
    plane_equation, inliers = pcd.segment_plane(distance_threshold=dist_threshold,
                                                ransac_n=3,
                                                num_iterations=1000)
    print(plane_equation)
    return plane_equation, inliers


def down_sample(pcd: o3d.geometry.PointCloud, voxel_size=0.05):
    return pcd.voxel_down_sample(voxel_size=voxel_size)


def remove_outliers(pcd: o3d.geometry.PointCloud, nb_neighbors=20, std_ratio=2.0):
    return pcd.remove_statistical_outlier(nb_neighbors, std_ratio)


def get_rotation_matrix(normal: ndarray):
    goal = np.array([0.0, 0.0, 1.0])
    normal = np.array([*normal[:3], 0.0])
    normal = (normal / np.linalg.norm(normal))[:3]
    identity = np.eye(3)
    if (normal == goal).all():
        rotation_matrix = identity
    else:
        v = np.cross(normal, goal)
        s = np.linalg.norm(v)
        c = np.dot(goal, normal)
        skew = np.array([
            [0.0, v[2], -v[1]],
            [-v[2], 0.0, v[0]],
            [v[1], -v[0], 0.0],
        ])
        rotation_matrix = identity + skew + ((np.matmul(skew, skew)) * ((1.0 - c) / (s * s)))
    matrix = np.eye(4)
    matrix[:3, :3] = np.linalg.inv(rotation_matrix)

    return matrix


def calculate_base_matrix(pcd: o3d.geometry.PointCloud):
    """
        Calculate matrix to move point cloud floor to x,y plane
        Steps:
            1. Find floor plane
            2. Calculate matrix
            3. Apply z offset to matrix


        :param pcd: Point cloud
        :return: Flattened point cloud
        """

    [[a, b, c, d], inliers] = get_floor_plane(pcd)
    rot_matrix = get_rotation_matrix(np.array([a, b, c, d]))
    rot_matrix[2][3] = d
    return rot_matrix, inliers


def cloud_to_plane(pcd: o3d.geometry.PointCloud):
    pcd1 = pcd.__copy__()
    rot_matrix, floor_points = cloud_to_plane_matrix(pcd)
    pcd1 = apply_matrix(pcd1, rot_matrix)
    return pcd1, rot_matrix, floor_points


def cloud_to_plane_matrix(pcd: o3d.geometry.PointCloud):
    rot_matrix, floor_points = calculate_base_matrix(pcd)
    pcd1 = pcd.__copy__()
    pcd1 = apply_matrix(pcd1, rot_matrix)
    if is_upside_down(pcd1):
        matrix = np.eye(4)
        matrix[0][0] = matrix[2][2] = -1
        rot_matrix = np.matmul(matrix, rot_matrix)
    return rot_matrix, floor_points


def is_upside_down(pcd: o3d.geometry.PointCloud, sample=1000):
    """
    Determine if cloud is upside down
    True - right side up
    False - upside down
    :param pcd: point cloud
    :param sample: number of sample points
    :return: Bool
    """
    dir_sum = 0
    for _ in range(sample):
        dir_sum += (1 if pcd.points[randint(0, len(pcd.points))][2] > 0.05 else -1)
    return dir_sum < 0


def apply_matrix(pcd: o3d.geometry.PointCloud, matrix):
    return pcd.transform(matrix)


def cloud_to_las(pcd: o3d.geometry.PointCloud, output_file_path):
    outfile = pylas.create(point_format_id=7, file_version='1.4')
    outfile.x = np.asarray(pcd.points)[:, 0]
    outfile.y = np.asarray(pcd.points)[:, 1]
    outfile.z = np.asarray(pcd.points)[:, 2]
    rgb = np.ascontiguousarray(np.asarray(pcd.colors)[:, 0:3] * 256, dtype='uint8')
    outfile.red = rgb[:, 0]
    outfile.green = rgb[:, 1]
    outfile.blue = rgb[:, 2]
    outfile.write(output_file_path)


def save_cloud(pcd: o3d.geometry.PointCloud, output_file_path):
    return o3d.io.write_point_cloud(output_file_path, pcd)


def las_to_potree(path_to_las, output_path) -> subprocess.CompletedProcess:
    executable = "PotreeConverter.exe" if platform.system().lower() == "windows" else "./PotreeConverter"
    output = subprocess.run(" ".join([executable, path_to_las, "-o", output_path]),
                            shell=True, capture_output=True,
                            cwd=os.path.join(os.path.dirname(os.path.realpath(__file__)), "potree"))
    return output


def cloud_to_file(pcd: o3d.geometry.PointCloud, output_file_path, downsample=True, downsample_voxel=0.05):
    """
    Write flattened(2D) point cloud to file.

    Two files will be generated:
        1. File with name filename contains all the point coordinates, with the Z coordinate removed to save
           space, since the cloud is only a plane. Format: X1:Y1:X2:Y2...
        2. File with name filename_color contains all the points color information. Format: R1:G1:B1:R2:G2:B2...

    :param pcd: Point cloud
    :param output_file_path: Output file name
    :param downsample: True if should downsample
    :param downsample_voxel: Downsample resolution
    :return:
    """
    if downsample:
        pcd = down_sample(pcd, downsample_voxel)
    points = np.asarray(pcd.points)
    points = np.delete(points, np.arange(2, points.size, 3))
    points.tofile(output_file_path, ":")
    colors = np.asarray(pcd.colors)
    colors = colors * 255
    colors = colors.astype(int)
    colors.tofile(output_file_path + "_color", ":")


def save_thumbnail(pcd: o3d.geometry.PointCloud, file_name):
    vis = o3d.visualization.Visualizer()
    vis.create_window(visible=False)
    vis.add_geometry(pcd)
    vis.capture_screen_image(file_name, True)
