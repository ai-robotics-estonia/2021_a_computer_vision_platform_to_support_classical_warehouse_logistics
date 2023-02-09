import IAttribute, { ATTRIBUTE_TYPE } from './IAttribute';

const StereoFusionMaxImageSize: IAttribute = {
  name: 'StereoFusion.max_image_size',
  description: 'Maximum image size in either dimension.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const StereoFusionMinNumPixels: IAttribute = {
  name: 'StereoFusion.min_num_pixels',
  description: 'Minimum number of fused pixels to produce a point.',
  defaultValue: 5,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const StereoFusionMaxNumPixels: IAttribute = {
  name: 'StereoFusion.max_num_pixels',
  description: 'Maximum number of pixels to fuse into a single point.',
  defaultValue: 10_000,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const StereoFusionMaxTraversalDepth: IAttribute = {
  name: 'StereoFusion.max_traversal_depth',
  description: 'Maximum depth in consistency graph traversal.',
  defaultValue: 100,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const StereoFusionMaxReprojError: IAttribute = {
  name: 'StereoFusion.max_reproj_error',
  description:
    'Maximum relative difference between measured and projected pixel.',
  defaultValue: 2,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const StereoFusionMaxDepthError: IAttribute = {
  name: 'StereoFusion.max_depth_error',
  description:
    'Maximum relative difference between measured and projected depth.',
  defaultValue: 0.0099999997764825821,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const StereoFusionMaxNormalError: IAttribute = {
  name: 'StereoFusion.max_normal_error',
  description:
    'Maximum angular difference in degrees of normals of pixels to be fused.',
  defaultValue: 10,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const StereoFusionCheckNumImages: IAttribute = {
  name: 'StereoFusion.check_num_images',
  description:
    'Number of overlapping images to transitively check for fusing points.',
  defaultValue: 50,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const StereoFusionCacheSize: IAttribute = {
  name: 'StereoFusion.cache_size',
  description:
    'Cache size in gigabytes for fusion. The fusion keeps the bitmaps, depth maps, normal maps, and consistency graphs of this number of images in memory. A higher value leads to less disk access and faster fusion, while a lower value leads to reduced memory usage. Note that a single image can consume a lot of memory, if the consistency graph is dense.',
  defaultValue: 32,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const StereoFusionUseCache: IAttribute = {
  name: 'StereoFusion.use_cache',
  description: 'Flag indicating whether to use LRU cache or pre-load all data',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};

const STEREO_FUSION_ATTRIBUTES = [
  StereoFusionMaxImageSize,
  StereoFusionMinNumPixels,
  StereoFusionMaxNumPixels,
  StereoFusionMaxTraversalDepth,
  StereoFusionMaxReprojError,
  StereoFusionMaxDepthError,
  StereoFusionMaxNormalError,
  StereoFusionCheckNumImages,
  StereoFusionCacheSize,
  StereoFusionUseCache,
];

export default STEREO_FUSION_ATTRIBUTES;
