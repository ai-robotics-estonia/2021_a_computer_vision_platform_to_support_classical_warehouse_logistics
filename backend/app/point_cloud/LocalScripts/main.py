import open3d as o3d
from open3d.visualization import gui

from app.point_cloud.LocalScripts.cloud_tools import read_cloud, cloud_to_plane, remove_outliers, down_sample


cloud_path = ""
#
pcd: o3d.geometry.PointCloud = read_cloud(cloud_path)
# print("Point before: ", len(pcd.points))
# [pcd, _] = remove_outliers(pcd)
# print("Point after: ", len(pcd.points))
#
# pcd = down_sample(pcd, voxel_size=0.03)
#
# print("Point down sampled: ", len(pcd.points))
#
# pcd, _, inliers = cloud_to_plane(pcd)
#
# inlier_cloud = pcd.select_by_index(inliers)
# inlier_cloud.paint_uniform_color([1.0, 0, 0])
# outlier_cloud = pcd.select_by_index(inliers, invert=True)

mesh = o3d.geometry.TriangleMesh.create_coordinate_frame()

# o3d.io.write_point_cloud("../../storage/37018032-9858-4201-9630-aa59857defe3/generated/base.ply", pcd)

o3d.visualization.draw_geometries([pcd, mesh])

