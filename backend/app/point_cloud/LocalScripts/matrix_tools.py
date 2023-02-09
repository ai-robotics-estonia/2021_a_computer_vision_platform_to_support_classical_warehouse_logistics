import numpy as np
from numpy import ndarray


def update_matrix(matrix: ndarray, offset_x: float, offset_y: float, offset_z: float, scale: float, angle: float):
    offset_matrix = creat_offset_matrix(offset_x, offset_y, offset_z)
    angle_matrix = create_angle_matrix(angle)
    scale_matrix = create_scale_matrix(scale)
    return combine_matrices(matrix, offset_matrix, angle_matrix, scale_matrix)


def combine_matrices(base_matrix, *matrices):
    for matrix in matrices:
        base_matrix = np.matmul(matrix, base_matrix)
    return base_matrix


def creat_offset_matrix(offset_x: float, offset_y: float, offset_z: float):
    matrix = np.eye(4)
    matrix[0][3] = offset_x
    matrix[1][3] = offset_y
    matrix[2][3] = offset_z
    return matrix


def create_angle_matrix(angle:float):
    matrix = np.eye(4)
    cos = np.cos(angle)
    sin = np.sin(angle)
    matrix[0][0] = cos
    matrix[1][0] = sin
    matrix[0][1] = -sin
    matrix[1][1] = cos
    return matrix


def create_scale_matrix(scale: float):
    matrix = np.eye(4)
    for i in range(3):
        matrix[i][i] = scale
    return matrix
