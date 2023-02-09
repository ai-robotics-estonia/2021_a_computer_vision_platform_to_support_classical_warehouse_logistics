import numpy as np
from numpy import ndarray
import quaternion


def read_image_positions(image_file_path):
    lines = []
    with open(image_file_path, "r") as file:
        file.readline()  # Skip header
        line = file.readline()
        while line:
            line = line.split(";")
            lines.append([line[0], *[float(val) for val in line[1:8]], line[8], *[float(val) for val in line[9:]]])
            line = file.readline()
    return lines


def invert_new_positions(positions: list):
    new_positions = []
    for position in positions:
        matrix = pos_to_matrix(position)
        matrix = np.linalg.inv(matrix)
        new_positions.append(position[0:1] + matrix_to_pos(matrix) + position[8:9])
    return new_positions


def read_colmap_image_positions(image_file_path):
    positions = []
    with open(image_file_path, "r") as file:
        for _ in range(5):  # Skips first four lines
            line = file.readline()
        while line:
            line = line.split(" ")
            positions.append([" ".join(line[9:]).strip(), *[float(val) for val in line[1:9]]])
            file.readline()  # Skips line with points data
            line = file.readline()
    return invert_new_positions(positions)


def read_colmap_camera_attributes(camera_file_path):
    cameras = {}
    with open(camera_file_path, "r") as file:
        for _ in range(4):
            line = file.readline()
        while line:
            line = line.split(" ")
            cameras[int(line[0])] = [
                line[1], *[float(val) for val in line[2:]],
            ]
            line = file.readline()
    return cameras


def combine_image_camera(images: list, cameras: dict):
    return [image[:-1] + cameras[image[-1]] for image in images]


def filter_images(images: list, cctv_names: list):
    cctv = []
    camera = []
    [(cctv if image[0] in cctv_names else camera).append(image) for image in images]
    return cctv, camera


def write_image_positions(output_file_path, positions: list):
    with open(output_file_path, "w") as file:
        file.truncate()
        file.write("NAME;QW;QX;QY;QZ;TX;TY;TZ;MODEL;WIDTH;HEIGHT;PARAMS[]\n")  # Add header
        [file.write(";".join(str(v).rstrip("0").strip(".") for v in position) + "\n") for position in positions]


def pos_to_matrix(position: list):
    img_matrix = np.eye(4)
    quad = np.quaternion(*position[1:5])
    rotation_matrix = quaternion.as_rotation_matrix(quad)
    img_matrix[:3, :3] = rotation_matrix
    img_matrix[:3, 3] = position[5:8]
    return img_matrix


def matrix_to_pos(matrix: ndarray):
    quad = quaternion.from_rotation_matrix(matrix[:3, :3])
    quad_float = quaternion.as_float_array(quad)
    return list(quad_float) + list(matrix[:3, 3])


def apply_matrix_to_pos(positions: list, matrix: ndarray):
    new_positions = []
    for position in positions:
        img_matrix = pos_to_matrix(position)
        new_matrix = np.matmul(matrix, img_matrix)
        new_positions.append(position[0:1] + matrix_to_pos(new_matrix) + position[8:])
    return new_positions
