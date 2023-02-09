import os
import shutil
from functools import lru_cache
from pathlib import Path

from app.db.domains import ImageTypeValues


@lru_cache
def get_root_dir():
    current_file = Path(__file__)
    current_file_dir = current_file.parent
    project_root = current_file_dir.parent
    project_root_absolute = project_root.resolve()
    return project_root_absolute


def get_cloud_path(cloud_path, cloud_name="filtered.ply"):
    project_root = get_root_dir()
    return os.path.join(project_root, "storage/projects/{}/{}".format(cloud_path, cloud_name))


def get_cloud_folder_path(cloud_path):
    project_root = get_root_dir()
    return os.path.join(project_root, "storage/projects/{}".format(cloud_path))


def get_generated_folder_path(cloud_path):
    project_root = get_root_dir()
    return os.path.join(project_root, "storage/generated/{}".format(cloud_path))


def get_generated_file_path(cloud_path, file_name):
    project_root = get_root_dir()
    return os.path.join(project_root, "storage/generated/{}/{}".format(cloud_path, file_name))


def get_image_folder_path(room_path: str, image_type: ImageTypeValues = None):
    project_root = get_root_dir()
    return os.path.join(project_root, f"storage/images/{room_path}{'/'+image_type.value if image_type else str()}")


def get_project_path(file_path):
    project_root = get_root_dir()
    return os.path.join(project_root, "storage/projects/{}".format(file_path))


def create_storage_folder(path: list):
    path = os.path.join(get_root_dir(), "storage", *path)
    os.makedirs(path, exist_ok=True)


def remove_folder(path: str):
    if not os.path.exists(path):
        return
    shutil.rmtree(path)
