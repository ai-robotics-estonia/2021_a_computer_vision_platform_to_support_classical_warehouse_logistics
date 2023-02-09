import IAttribute, { ATTRIBUTE_TYPE } from './IAttribute';

export const SiftMatchingNumThreads: IAttribute = {
  name: 'SiftMatching.num_threads',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
export const SiftMatchingUseGpu: IAttribute = {
  name: 'SiftMatching.use_gpu',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
export const SiftMatchingGpuIndex: IAttribute = {
  name: 'SiftMatching.gpu_index',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
export const SiftMatchingMaxRatio: IAttribute = {
  name: 'SiftMatching.max_ratio',
  description: 'Maximum distance ratio between first and second best match.',
  defaultValue: 0.80000000000000004,
  type: ATTRIBUTE_TYPE.FLOAT,
};
export const SiftMatchingMaxDistance: IAttribute = {
  name: 'SiftMatching.max_distance',
  description: 'Maximum distance to best match.',
  defaultValue: 0.69999999999999996,
  type: ATTRIBUTE_TYPE.FLOAT,
};
export const SiftMatchingCrossCheck: IAttribute = {
  name: 'SiftMatching.cross_check',
  description: 'Whether to enable cross checking in matching.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
export const SiftMatchingMaxError: IAttribute = {
  name: 'SiftMatching.max_error',
  description: 'Maximum epipolar error in pixels for geometric verification.',
  defaultValue: 4,
  type: ATTRIBUTE_TYPE.FLOAT,
};
export const SiftMatchingMaxNumMatches: IAttribute = {
  name: 'SiftMatching.max_num_matches',
  description: 'Maximum number of matches.',
  defaultValue: 32768,
  type: ATTRIBUTE_TYPE.NUMBER,
};
export const SiftMatchingConfidence: IAttribute = {
  name: 'SiftMatching.confidence',
  defaultValue: 0.999,
  type: ATTRIBUTE_TYPE.FLOAT,
  max: 1,
};
export const SiftMatchingMaxNumTrials: IAttribute = {
  name: 'SiftMatching.max_num_trials',
  description:
    'Minimum/maximum number of RANSAC iterations. Note that this option overrules the min_inlier_ratio option == min_num_trials',
  defaultValue: 10_000,
  type: ATTRIBUTE_TYPE.NUMBER,
};
export const SiftMatchingMinInlierRatio: IAttribute = {
  name: 'SiftMatching.min_inlier_ratio',
  description:
    'A priori assumed minimum inlier ratio, which determines the maximum number of iterations.',
  defaultValue: 0.25,
  type: ATTRIBUTE_TYPE.FLOAT,
};
export const SiftMatchingMinNumInliers: IAttribute = {
  name: 'SiftMatching.min_num_inliers',
  description:
    'Minimum number of inliers for an image pair to be considered as geometrically verified.',
  defaultValue: 15,
  type: ATTRIBUTE_TYPE.NUMBER,
};
export const SiftMatchingMultipleModels: IAttribute = {
  name: 'SiftMatching.multiple_models',
  description:
    'Whether to attempt to estimate multiple geometric models per image pair.',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
export const SiftMatchingGuidedMatching: IAttribute = {
  name: 'SiftMatching.guided_matching',
  description:
    'Whether to perform guided matching, if geometric verification succeeds.',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};

const SIFT_MATCHING_ATTRIBUTES = [
  // SiftMatchingNumThreads,
  // SiftMatchingUseGpu,
  // SiftMatchingGpuIndex,

  SiftMatchingMaxRatio,
  SiftMatchingMaxDistance,
  SiftMatchingCrossCheck,
  SiftMatchingMaxError,
  SiftMatchingMaxNumMatches,
  SiftMatchingConfidence,
  SiftMatchingMaxNumTrials,
  SiftMatchingMinInlierRatio,
  SiftMatchingMinNumInliers,
  SiftMatchingMultipleModels,
  SiftMatchingGuidedMatching,
];

export default SIFT_MATCHING_ATTRIBUTES;
