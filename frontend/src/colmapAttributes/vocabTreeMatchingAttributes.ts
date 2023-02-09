import IAttribute, { ATTRIBUTE_TYPE } from './IAttribute';
import {
  SiftMatchingConfidence,
  SiftMatchingCrossCheck,
  SiftMatchingGuidedMatching,
  SiftMatchingMaxDistance,
  SiftMatchingMaxError,
  SiftMatchingMaxNumMatches,
  SiftMatchingMaxNumTrials,
  SiftMatchingMaxRatio,
  SiftMatchingMinInlierRatio,
  SiftMatchingMinNumInliers,
  SiftMatchingMultipleModels,
} from './siftMatchingAttributes';

const VocabTreeMatchingNumImages: IAttribute = {
  name: 'VocabTreeMatching.num_images',
  description: 'Number of images to retrieve for each query image.',
  defaultValue: 100,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const VocabTreeMatchingNumNearestNeighbors: IAttribute = {
  name: 'VocabTreeMatching.num_nearest_neighbors',
  description: 'Number of nearest neighbors to retrieve per query feature.',
  defaultValue: 5,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const VocabTreeMatchingNumChecks: IAttribute = {
  name: 'VocabTreeMatching.num_checks',
  description: 'Number of nearest-neighbor checks to use in retrieval.',
  defaultValue: 256,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const VocabTreeMatchingNumImagesAfterVerification: IAttribute = {
  name: 'VocabTreeMatching.num_images_after_verification',
  description:
    'How many images to return after spatial verification. Set to 0 to turn off spatial verification.',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const VocabTreeMatchingMaxNumFeatures: IAttribute = {
  name: 'VocabTreeMatching.max_num_features',
  description:
    'The maximum number of features to use for indexing an image. If an image has more features, only the largest-scale features will be indexed.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};

export const VOCAB_TREE_MATCHING_ATTRIBUTES = [
  VocabTreeMatchingNumImages,
  VocabTreeMatchingNumNearestNeighbors,
  VocabTreeMatchingNumChecks,
  VocabTreeMatchingNumImagesAfterVerification,
  VocabTreeMatchingMaxNumFeatures,
];

export default [
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

  ...VOCAB_TREE_MATCHING_ATTRIBUTES,
];
