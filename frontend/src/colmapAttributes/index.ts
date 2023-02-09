import IAttribute from './IAttribute';
import MAPPER_ATTRIBUTES from './mapperAttributes';
import PATCH_MATCH_STEREO_ATTRIBUTES from './patchMatchStereoAttributes';
import STEREO_FUSION_ATTRIBUTES from './stereoFusionAttributes';
import SIFT_EXTRACTION_ATTRIBUTES from './siftExtractionAttributes';
import SIFT_MATCHING_ATTRIBUTES from './siftMatchingAttributes';
import { VOCAB_TREE_MATCHING_ATTRIBUTES } from './vocabTreeMatchingAttributes';
import { EXHAUSTIVE_MATCHER_ATTRIBUTES } from './exhaustiveMatchingAttributes';

export default [
  ...MAPPER_ATTRIBUTES,
  ...PATCH_MATCH_STEREO_ATTRIBUTES,
  ...STEREO_FUSION_ATTRIBUTES,
  ...SIFT_EXTRACTION_ATTRIBUTES,
  ...SIFT_MATCHING_ATTRIBUTES,
  ...VOCAB_TREE_MATCHING_ATTRIBUTES,
  ...EXHAUSTIVE_MATCHER_ATTRIBUTES,
] as IAttribute[];
