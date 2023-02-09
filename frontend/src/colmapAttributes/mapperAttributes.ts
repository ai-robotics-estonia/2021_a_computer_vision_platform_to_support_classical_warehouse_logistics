import IAttribute, { ATTRIBUTE_TYPE } from './IAttribute';

const MapperMinNumMatches: IAttribute = {
  name: 'Mapper.min_num_matches',
  description:
    'The minimum number of matches for inlier matches to be considered.',
  defaultValue: 15,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperIgnoreWatermarks: IAttribute = {
  name: 'Mapper.ignore_watermarks',
  description: 'Whether to ignore the inlier matches of watermark image pairs.',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperMultipleModels: IAttribute = {
  name: 'Mapper.multiple_models',
  description: 'Whether to reconstruct multiple sub-models.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperMaxNumModels: IAttribute = {
  name: 'Mapper.max_num_models',
  description: 'The number of sub-models to reconstruct.',
  defaultValue: 50,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperMaxModelOverlap: IAttribute = {
  name: 'Mapper.max_model_overlap',
  description:
    'The maximum number of overlapping images between sub-models. If the current sub-models shares more than this number of images with another model, then the reconstruction is stopped.',
  defaultValue: 20,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperMinModelSize: IAttribute = {
  name: 'Mapper.min_model_size',
  description:
    'The minimum number of registered images of a sub-model, otherwise the sub-model is discarded.',
  defaultValue: 10,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperInitImageId1: IAttribute = {
  name: 'Mapper.init_image_id1',
  description:
    'The image identifiers used to initialize the reconstruction. Note that only one or both image identifiers can be specified. In the former case, the second image is automatically determined.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperInitImageId2: IAttribute = {
  name: 'Mapper.init_image_id2',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperInitNumTrials: IAttribute = {
  name: 'Mapper.init_num_trials',
  description: 'The number of trials to initialize the reconstruction.',
  defaultValue: 200,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperExtractColors: IAttribute = {
  name: 'Mapper.extract_colors',
  description: 'Whether to extract colors for reconstructed points.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperMinFocalLengthRatio: IAttribute = {
  name: 'Mapper.min_focal_length_ratio',
  description: 'Thresholds for filtering images with degenerate intrinsics.',
  defaultValue: 0.10000000000000001,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperMaxFocalLengthRatio: IAttribute = {
  name: 'Mapper.max_focal_length_ratio',
  defaultValue: 10,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperMaxExtraParam: IAttribute = {
  name: 'Mapper.max_extra_param',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperBaRefineFocalLength: IAttribute = {
  name: 'Mapper.ba_refine_focal_length',
  description:
    'Which intrinsic parameters to optimize during the reconstruction.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperBaRefinePrincipalPoint: IAttribute = {
  name: 'Mapper.ba_refine_principal_point',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperBaRefineExtraParams: IAttribute = {
  name: 'Mapper.ba_refine_extra_params',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperBaMinNumResidualsForMultiThreading: IAttribute = {
  name: 'Mapper.ba_min_num_residuals_for_multi_threading',
  description:
    'The minimum number of residuals per bundle adjustment problem to enable multi-threading solving of the problems.',
  defaultValue: 50_000,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaLocalNumImages: IAttribute = {
  name: 'Mapper.ba_local_num_images',
  description: 'The number of images to optimize in local bundle adjustment.',
  defaultValue: 6,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaLocalFunctionTolerance: IAttribute = {
  name: 'Mapper.ba_local_function_tolerance',
  description: 'Ceres solver function tolerance for local bundle adjustment',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperBaLocalMaxNumIterations: IAttribute = {
  name: 'Mapper.ba_local_max_num_iterations',
  description: 'The maximum number of local bundle adjustment iterations.',
  defaultValue: 25,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaGlobalUsePba: IAttribute = {
  name: 'Mapper.ba_global_use_pba',
  description: 'Whether to use PBA in global bundle adjustment.',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperBaGlobalPbaGpuIndex: IAttribute = {
  name: 'Mapper.ba_global_pba_gpu_index',
  description: 'The GPU index for PBA bundle adjustment.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaGlobalImagesRatio: IAttribute = {
  name: 'Mapper.ba_global_images_ratio',
  description:
    'The growth rates after which to perform global bundle adjustment.',
  defaultValue: 1.1000000000000001,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperBaGlobalPointsRatio: IAttribute = {
  name: 'Mapper.ba_global_points_ratio',
  defaultValue: 1.1000000000000001,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperBaGlobalImagesFreq: IAttribute = {
  name: 'Mapper.ba_global_images_freq',
  defaultValue: 500,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaGlobalPointsFreq: IAttribute = {
  name: 'Mapper.ba_global_points_freq',
  defaultValue: 250_000,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaGlobalFunctionTolerance: IAttribute = {
  name: 'Mapper.ba_global_function_tolerance',
  description: 'Ceres solver function tolerance for global bundle adjustment',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaGlobalMaxNumIterations: IAttribute = {
  name: 'Mapper.ba_global_max_num_iterations',
  description: 'The maximum number of global bundle adjustment iterations.',
  defaultValue: 50,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaGlobalMaxRefinements: IAttribute = {
  name: 'Mapper.ba_global_max_refinements',
  description: 'The thresholds for iterative bundle adjustment refinements.',
  defaultValue: 5,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaGlobalMaxRefinementChange: IAttribute = {
  name: 'Mapper.ba_global_max_refinement_change',
  defaultValue: 0.00050000000000000001,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaLocalMaxRefinements: IAttribute = {
  name: 'Mapper.ba_local_max_refinements',
  defaultValue: 2,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperBaLocalMaxRefinementChange: IAttribute = {
  name: 'Mapper.ba_local_max_refinement_change',
  defaultValue: 0.001,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperSnapshotImagesFreq: IAttribute = {
  name: 'Mapper.snapshot_images_freq',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperFixExistingImages: IAttribute = {
  name: 'Mapper.fix_existing_images',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const MapperInitMinNumInliers: IAttribute = {
  name: 'Mapper.init_min_num_inliers',
  defaultValue: 100,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperInitMaxError: IAttribute = {
  name: 'Mapper.init_max_error',
  defaultValue: 4,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperInitMaxForwardMotion: IAttribute = {
  name: 'Mapper.init_max_forward_motion',
  defaultValue: 0.94999999999999996,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperInitMinTriAngle: IAttribute = {
  name: 'Mapper.init_min_tri_angle',
  defaultValue: 16,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperInitMaxRegTrials: IAttribute = {
  name: 'Mapper.init_max_reg_trials',
  defaultValue: 2,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperAbsPoseMaxError: IAttribute = {
  name: 'Mapper.abs_pose_max_error',
  defaultValue: 12,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperAbsPoseMinNumInliers: IAttribute = {
  name: 'Mapper.abs_pose_min_num_inliers',
  defaultValue: 30,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperAbsPoseMinInlierRatio: IAttribute = {
  name: 'Mapper.abs_pose_min_inlier_ratio',
  defaultValue: 0.25,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperFilterMaxReprojError: IAttribute = {
  name: 'Mapper.filter_max_reproj_error',
  defaultValue: 4,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperFilterMinTriAngle: IAttribute = {
  name: 'Mapper.filter_min_tri_angle',
  defaultValue: 1.5,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperMaxRegTrials: IAttribute = {
  name: 'Mapper.max_reg_trials',
  defaultValue: 3,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperLocalBaMinTriAngle: IAttribute = {
  name: 'Mapper.local_ba_min_tri_angle',
  defaultValue: 6,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriMaxTransitivity: IAttribute = {
  name: 'Mapper.tri_max_transitivity',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriCreateMaxAngleError: IAttribute = {
  name: 'Mapper.tri_create_max_angle_error',
  defaultValue: 2,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriContinueMaxAngleError: IAttribute = {
  name: 'Mapper.tri_continue_max_angle_error',
  defaultValue: 2,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriMergeMaxReprojError: IAttribute = {
  name: 'Mapper.tri_merge_max_reproj_error',
  defaultValue: 4,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriCompleteMaxReprojError: IAttribute = {
  name: 'Mapper.tri_complete_max_reproj_error',
  defaultValue: 4,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriCompleteMaxTransitivity: IAttribute = {
  name: 'Mapper.tri_complete_max_transitivity',
  defaultValue: 5,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriReMaxAngleError: IAttribute = {
  name: 'Mapper.tri_re_max_angle_error',
  defaultValue: 5,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriReMinRatio: IAttribute = {
  name: 'Mapper.tri_re_min_ratio',
  defaultValue: 0.20000000000000001,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperTriReMaxTrials: IAttribute = {
  name: 'Mapper.tri_re_max_trials',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const MapperTriMinAngle: IAttribute = {
  name: 'Mapper.tri_min_angle',
  defaultValue: 1.5,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const MapperTriIgnoreTwoViewTracks: IAttribute = {
  name: 'Mapper.tri_ignore_two_view_tracks',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.NUMBER,
};

const MAPPER_ATTRIBUTES = [
  MapperMinNumMatches,
  MapperIgnoreWatermarks,
  MapperMultipleModels,
  MapperMaxNumModels,
  MapperMaxModelOverlap,
  MapperMinModelSize,
  MapperInitImageId1,
  MapperInitImageId2,
  MapperInitNumTrials,
  MapperExtractColors,
  MapperMinFocalLengthRatio,
  MapperMaxFocalLengthRatio,
  MapperMaxExtraParam,
  MapperBaRefineFocalLength,
  MapperBaRefinePrincipalPoint,
  MapperBaRefineExtraParams,
  MapperBaMinNumResidualsForMultiThreading,
  MapperBaLocalNumImages,
  MapperBaLocalFunctionTolerance,
  MapperBaLocalMaxNumIterations,
  MapperBaGlobalUsePba,
  MapperBaGlobalPbaGpuIndex,
  MapperBaGlobalImagesRatio,
  MapperBaGlobalPointsRatio,
  MapperBaGlobalImagesFreq,
  MapperBaGlobalPointsFreq,
  MapperBaGlobalFunctionTolerance,
  MapperBaGlobalMaxNumIterations,
  MapperBaGlobalMaxRefinements,
  MapperBaGlobalMaxRefinementChange,
  MapperBaLocalMaxRefinements,
  MapperBaLocalMaxRefinementChange,
  MapperSnapshotImagesFreq,
  MapperFixExistingImages,
  MapperInitMinNumInliers,
  MapperInitMaxError,
  MapperInitMaxForwardMotion,
  MapperInitMinTriAngle,
  MapperInitMaxRegTrials,
  MapperAbsPoseMaxError,
  MapperAbsPoseMinNumInliers,
  MapperAbsPoseMinInlierRatio,
  MapperFilterMaxReprojError,
  MapperFilterMinTriAngle,
  MapperMaxRegTrials,
  MapperLocalBaMinTriAngle,
  MapperTriMaxTransitivity,
  MapperTriCreateMaxAngleError,
  MapperTriContinueMaxAngleError,
  MapperTriMergeMaxReprojError,
  MapperTriCompleteMaxReprojError,
  MapperTriCompleteMaxTransitivity,
  MapperTriReMaxAngleError,
  MapperTriReMinRatio,
  MapperTriReMaxTrials,
  MapperTriMinAngle,
  MapperTriIgnoreTwoViewTracks,
];
export default MAPPER_ATTRIBUTES;
