from datetime import datetime
from typing import Optional, List
from uuid import UUID

import numpy
from fastapi_camelcase import CamelModel as BaseModel
from numpy import ndarray
from pydantic import BaseModel as PydanticModel
from pydantic import validator
from pydantic.fields import ModelField

from app.db.models import PointCloud as PointCloudMDL
from .base import Timestamps, SearchBase


class NDArray(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate_ndarray

    @classmethod
    def validate_ndarray(cls, ndarray: ndarray) -> List[List[float]]:
        return [[float(value) for value in row] for row in ndarray]

    @classmethod
    def __modify_schema__(cls, field_schema, field: Optional[ModelField]):
        if field:
            field_schema['examples'] = [[float(value) for value in row] for row in numpy.eye(4)]


class ColmapAttributes(PydanticModel):

    # First octave in the pyramid, i.e. -1 upsamples the image by one level.
    SiftExtraction_first_octave: Optional[int] = None
    # Number of octaves.
    SiftExtraction_num_octaves: Optional[int] = None
    # Number of levels per octave.
    SiftExtraction_octave_resolution: Optional[int] = None
    # Peak threshold for detection.
    SiftExtraction_peak_threshold: Optional[float] = None
    # Edge threshold for detection.
    SiftExtraction_edge_threshold: Optional[float] = None
    # Estimate affine shape of SIFT features in the form of oriented ellipses as opposed to original SIFT which
    # estimates oriented disks.
    SiftExtraction_estimate_affine_shape: Optional[bool] = None
    # Maximum number of orientations per keypoint if not estimate_affine_shape.
    SiftExtraction_max_num_orientations: Optional[int] = None
    # Fix the orientation to 0 for upright features.
    SiftExtraction_upright: Optional[bool] = None
    # Fix the orientation to 0 for upright features.
    # Note that this feature is only available in the OpenGL SiftGPU version.
    # == darkness_adaptivity

    # Domain-size pooling parameters. Domain-size pooling computes an average
    # SIFT descriptor across multiple scales around the detected scale. This was
    # proposed in "Domain-Size Pooling in Local Descriptors and Network
    # Architectures", J. Dong and S. Soatto, CVPR 2015. This has been shown to
    # outperform other SIFT variants and learned descriptors in "Comparative
    # Evaluation of Hand-Crafted and Learned Local Features", Schönberger,
    # Hardmeier, Sattler, Pollefeys, CVPR 2016.
    SiftExtraction_domain_size_pooling: Optional[bool] = None
    SiftExtraction_dsp_min_scale: Optional[float] = None
    SiftExtraction_dsp_max_scale: Optional[float] = None
    SiftExtraction_dsp_num_scales: Optional[int] = None

    # ================ Matching common ================
    # Maximum distance ratio between first and second best match.
    SiftMatching_max_ratio: Optional[float] = None
    # Maximum distance to best match.
    SiftMatching_max_distance: Optional[float] = None
    # Whether to enable cross checking in matching.
    SiftMatching_cross_check: Optional[bool] = None
    # Maximum epipolar error in pixels for geometric verification.
    SiftMatching_max_error: Optional[float] = None
    # Maximum number of matches.
    SiftMatching_max_num_matches: Optional[int] = None
    SiftMatching_confidence: Optional[float] = None
    # Minimum/maximum number of RANSAC iterations. Note that this option
    # overrules the min_inlier_ratio option
    # == min_num_trials
    SiftMatching_max_num_trials: Optional[int] = None
    # A priori assumed minimum inlier ratio, which determines the maximum number of iterations.
    SiftMatching_min_inlier_ratio: Optional[float] = None
    # Minimum number of inliers for an image pair to be considered as geometrically verified.
    SiftMatching_min_num_inliers: Optional[int] = None
    # Whether to attempt to estimate multiple geometric models per image pair.
    SiftMatching_multiple_models: Optional[bool] = None
    # Whether to perform guided matching, if geometric verification succeeds.
    SiftMatching_guided_matching: Optional[bool] = None
    # Force Homography use for Two-view Geometry (can help for planar scenes)
    # == planar_scene

    # ================ Matching - vocab tree matcher ================
    # Number of images to retrieve for each query image.
    VocabTreeMatching_num_images: Optional[int] = None
    # Number of nearest neighbors to retrieve per query feature.
    VocabTreeMatching_num_nearest_neighbors: Optional[int] = None
    # Number of nearest-neighbor checks to use in retrieval.
    VocabTreeMatching_num_checks: Optional[int] = None
    # How many images to return after spatial verification. Set to 0 to turn off spatial verification.
    VocabTreeMatching_num_images_after_verification: Optional[int] = None
    # The maximum number of features to use for indexing an image. If an image has more features, only the largest-scale
    # features will be indexed.
    VocabTreeMatching_max_num_features: Optional[int] = None

    # ================ Matching - exhaustive matcher ================
    # Block size, i.e. number of images to simultaneously load into memory.
    ExhaustiveMatching_block_size: Optional[int] = None

    # Matcher
    matcher: Optional[str] = None

    # ================ Incremental mapper ================
    # The minimum number of matches for inlier matches to be considered.
    Mapper_min_num_matches: Optional[int] = None

    # Whether to ignore the inlier matches of watermark image pairs.
    Mapper_ignore_watermarks: Optional[bool] = None

    # Whether to reconstruct multiple sub-models.
    Mapper_multiple_models: Optional[bool] = None

    # The number of sub-models to reconstruct.
    Mapper_max_num_models: Optional[int] = None

    # The maximum number of overlapping images between sub-models. If the
    # current sub-models shares more than this number of images with another
    # model, then the reconstruction is stopped.
    Mapper_max_model_overlap: Optional[int] = None

    # The minimum number of registered images of a sub-model, otherwise the
    # sub-model is discarded.
    Mapper_min_model_size: Optional[int] = None

    # The image identifiers used to initialize the reconstruction. Note that
    # only one or both image identifiers can be specified. In the former case,
    # the second image is automatically determined.
    Mapper_init_image_id1: Optional[int] = None
    Mapper_init_image_id2: Optional[int] = None

    # The number of trials to initialize the reconstruction.
    Mapper_init_num_trials: Optional[int] = None

    # Whether to extract colors for reconstructed points.
    Mapper_extract_colors: Optional[bool] = None

    # The number of threads to use during reconstruction.
    Mapper_num_threads: Optional[int] = None

    # Thresholds for filtering images with degenerate intrinsics.
    Mapper_min_focal_length_ratio: Optional[float] = None
    Mapper_max_focal_length_ratio: Optional[float] = None
    Mapper_max_extra_param: Optional[float] = None

    # Which intrinsic parameters to optimize during the reconstruction.
    Mapper_ba_refine_focal_length: Optional[bool] = None
    Mapper_ba_refine_principal_point: Optional[bool] = None
    Mapper_ba_refine_extra_params: Optional[bool] = None

    # The minimum number of residuals per bundle adjustment problem to
    # enable multi-threading solving of the problems.
    Mapper_ba_min_num_residuals_for_multi_threading: Optional[int] = None

    # The number of images to optimize in local bundle adjustment.
    Mapper_ba_local_num_images: Optional[int] = None

    # Ceres solver function tolerance for local bundle adjustment
    Mapper_ba_local_function_tolerance: Optional[float] = None

    # The maximum number of local bundle adjustment iterations.
    Mapper_ba_local_max_num_iterations: Optional[int] = None

    # Whether to use PBA in global bundle adjustment.
    Mapper_ba_global_use_pba: Optional[bool] = None

    # The GPU index for PBA bundle adjustment.
    Mapper_ba_global_pba_gpu_index: Optional[int] = None

    # The growth rates after which to perform global bundle adjustment.
    Mapper_ba_global_images_ratio: Optional[float] = None
    Mapper_ba_global_points_ratio: Optional[float] = None
    Mapper_ba_global_images_freq: Optional[int] = None
    Mapper_ba_global_points_freq: Optional[int] = None

    # Ceres solver function tolerance for global bundle adjustment
    Mapper_ba_global_function_tolerance: Optional[float] = None

    # The maximum number of global bundle adjustment iterations.
    Mapper_ba_global_max_num_iterations: Optional[int] = None

    # The thresholds for iterative bundle adjustment refinements.
    Mapper_ba_local_max_refinements: Optional[int] = None
    Mapper_ba_local_max_refinement_change: Optional[float] = None
    Mapper_ba_global_max_refinements: Optional[int] = None
    Mapper_ba_global_max_refinement_change: Optional[float] = None

    # ================ Patch match stereo ================
    # Maximum image size in either dimension.
    PatchMatchStereo_max_image_size: Optional[int] = None

    # Depth range in which to randomly sample depth hypotheses.
    PatchMatchStereo_depth_min: Optional[float] = None
    PatchMatchStereo_depth_max: Optional[float] = None

    # Half window size to compute NCC photo-consistency cost.
    PatchMatchStereo_window_radius: Optional[int] = None

    # Number of pixels to skip when computing NCC. For a value of 1, every
    # pixel is used to compute the NCC. For larger values, only every n-th row
    # and column is used and the computation speed thereby increases roughly by
    # a factor of window_step^2. Note that not all combinations of window sizes
    # and steps produce nice results, especially if the step is greather than 2.
    PatchMatchStereo_window_step: Optional[int] = None

    # Parameters for bilaterally weighted NCC.
    PatchMatchStereo_sigma_spatial: Optional[float] = None
    PatchMatchStereo_sigma_color: Optional[float] = None

    # Number of random samples to draw in Monte Carlo sampling.
    PatchMatchStereo_num_samples: Optional[int] = None

    # Spread of the NCC likelihood function.
    PatchMatchStereo_ncc_sigma: Optional[float] = None

    # Minimum triangulation angle in degrees.
    PatchMatchStereo_min_triangulation_angle: Optional[float] = None

    # Spread of the incident angle likelihood function.
    PatchMatchStereo_incident_angle_sigma: Optional[float] = None

    # Number of coordinate descent iterations. Each iteration consists
    # of four sweeps from left to right, top to bottom, and vice versa.
    PatchMatchStereo_num_iterations: Optional[int] = None

    # Whether to add a regularized geometric consistency term to the cost
    # function. If true, the `depth_maps` and `normal_maps` must not be null.
    PatchMatchStereo_geom_consistency: Optional[bool] = None

    # The relative weight of the geometric consistency term w.r.t. to
    # the photo-consistency term.
    PatchMatchStereo_geom_consistency_regularizer: Optional[float] = None

    # Maximum geometric consistency cost in terms of the forward-backward
    # reprojection error in pixels.
    PatchMatchStereo_geom_consistency_max_cost: Optional[float] = None

    # Whether to enable filtering.
    PatchMatchStereo_filter: Optional[bool] = None

    # Minimum NCC coefficient for pixel to be photo-consistent.
    PatchMatchStereo_filter_min_ncc: Optional[float] = None

    # Minimum triangulation angle to be stable.
    PatchMatchStereo_filter_min_triangulation_angle: Optional[float] = None

    # Minimum number of source images have to be consistent
    # for pixel not to be filtered.
    PatchMatchStereo_filter_min_num_consistent: Optional[int] = None

    # Maximum forward-backward reprojection error for pixel
    # to be geometrically consistent.
    PatchMatchStereo_filter_geom_consistency_max_cost: Optional[float] = None

    # Cache size in gigabytes for patch match, which keeps the bitmaps, depth
    # maps, and normal maps of this number of images in memory. A higher value
    # leads to less disk access and faster computation, while a lower value
    # leads to reduced memory usage. Note that a single image can consume a lot
    # of memory, if the consistency graph is dense.
    PatchMatchStereo_cache_size: Optional[float] = None

    # Whether to tolerate missing images/maps in the problem setup
    PatchMatchStereo_allow_missing_files: Optional[bool] = None

    # Whether to write the consistency graph.
    PatchMatchStereo_write_consistency_graph: Optional[bool] = None

    # ================ Stereo fusion ================
    # Maximum image size in either dimension.
    StereoFusion_max_image_size: Optional[int] = None

    # Minimum number of fused pixels to produce a point.
    StereoFusion_min_num_pixels: Optional[int] = None

    # Maximum number of pixels to fuse into a single point.
    StereoFusion_max_num_pixels: Optional[int] = None

    # Maximum depth in consistency graph traversal.
    StereoFusion_max_traversal_depth: Optional[int] = None

    # Maximum relative difference between measured and projected pixel.
    StereoFusion_max_reproj_error: Optional[float] = None

    # Maximum relative difference between measured and projected depth.
    StereoFusion_max_depth_error: Optional[float] = None

    # Maximum angular difference in degrees of normals of pixels to be fused.
    StereoFusion_max_normal_error: Optional[float] = None

    # Number of overlapping images to transitively check for fusing points.
    StereoFusion_check_num_images: Optional[int] = None

    # Flag indicating whether to use LRU cache or pre-load all data
    StereoFusion_use_cache: Optional[bool] = None

    # Cache size in gigabytes for fusion. The fusion keeps the bitmaps, depth
    # maps, normal maps, and consistency graphs of this number of images in
    # memory. A higher value leads to less disk access and faster fusion, while
    # a lower value leads to reduced memory usage. Note that a single image can
    # consume a lot of memory, if the consistency graph is dense.
    StereoFusion_cache_size: Optional[float] = None

    def to_attributes_str(self):
        return "--"+" --".join(
            f"{key} {int(value) if isinstance(value, bool) else value}" for key, value in self.dict().items() if value is not None
        )


class PointCloudBase(BaseModel):
    id: int
    colmap_attributes: Optional[str]


class PointCloudInDB(PointCloudBase, Timestamps):
    room_id: int
    matrix: NDArray
    queued_at: Optional[datetime]
    started_at: Optional[datetime]
    finished_at: Optional[datetime]
    slurm_id: Optional[int]
    slurm_exit_code: Optional[int]
    file_path: UUID
    slurm_state: Optional[str]
    point_count: Optional[int]
    created_by_id: int

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True


class PointCloud(PointCloudInDB):
    ...


class PointCloudUpdate(PointCloudBase):
    pass


class PointCloudCreateIn(BaseModel):
    room_id: int
    colmap_attributes: ColmapAttributes

    class Config:
        orm_mode = True


class PointCloudCreate(PointCloudCreateIn):
    ...


class PointCloudOffset(BaseModel):
    offset_x: float = 0.0
    offset_y: float = 0.0
    offset_z: float = 0.0
    angle: float = 0.0
    scale: float = 1.0

    @validator("scale")
    def scale_not_zero(cls, v):
        if v == 0:
            raise ValueError("Scale cannot be zero")
        return v


class PointCloudSearch(SearchBase):
    model = PointCloudMDL


