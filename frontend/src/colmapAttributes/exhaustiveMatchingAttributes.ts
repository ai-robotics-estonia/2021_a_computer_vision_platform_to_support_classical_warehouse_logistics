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
} from './siftMatchingAttributes';

const ExhaustiveMatchingBlockSize: IAttribute = {
  name: 'ExhaustiveMatching.block_size',
  description:
    'Block size, i.e. number of images to simultaneously load into memory.',
  defaultValue: 50,
  type: ATTRIBUTE_TYPE.NUMBER,
};

export const EXHAUSTIVE_MATCHER_ATTRIBUTES = [ExhaustiveMatchingBlockSize];

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
  SiftMatchingGuidedMatching,

  ...EXHAUSTIVE_MATCHER_ATTRIBUTES,
];
