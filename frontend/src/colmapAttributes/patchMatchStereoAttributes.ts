import IAttribute, { ATTRIBUTE_TYPE } from './IAttribute';

const PatchMatchStereoMaxImageSize: IAttribute = {
  name: 'PatchMatchStereo.max_image_size',
  description: 'Maximum image size in either dimension.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const PatchMatchStereoGpuIndex: IAttribute = {
  name: 'PatchMatchStereo.gpu_index',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const PatchMatchStereoDepthMin: IAttribute = {
  name: 'PatchMatchStereo.depth_min',
  description: 'Depth range in which to randomly sample depth hypotheses.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoDepthMax: IAttribute = {
  name: 'PatchMatchStereo.depth_max',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoWindowRadius: IAttribute = {
  name: 'PatchMatchStereo.window_radius',
  description: 'Half window size to compute NCC photo-consistency cost.',
  defaultValue: 5,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const PatchMatchStereoWindowStep: IAttribute = {
  name: 'PatchMatchStereo.window_step',
  description:
    'Number of pixels to skip when computing NCC. For a value of 1, every pixel is used to compute the NCC. For larger values, only every n-th row and column is used and the computation speed thereby increases roughly by a factor of window_step^2. Note that not all combinations of window sizes and steps produce nice results, especially if the step is greather than 2.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const PatchMatchStereoSigmaSpatial: IAttribute = {
  name: 'PatchMatchStereo.sigma_spatial',
  description: 'Parameters for bilaterally weighted NCC.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoSigmaColor: IAttribute = {
  name: 'PatchMatchStereo.sigma_color',
  defaultValue: 0.20000000298023224,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoNumSamples: IAttribute = {
  name: 'PatchMatchStereo.num_samples',
  description: 'Number of random samples to draw in Monte Carlo sampling.',
  defaultValue: 15,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const PatchMatchStereoNccSigma: IAttribute = {
  name: 'PatchMatchStereo.ncc_sigma',
  description: 'Spread of the NCC likelihood function.',
  defaultValue: 0.60000002384185791,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoMinTriangulationAngle: IAttribute = {
  name: 'PatchMatchStereo.min_triangulation_angle',
  description: 'Minimum triangulation angle in degrees.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoIncidentAngleSigma: IAttribute = {
  name: 'PatchMatchStereo.incident_angle_sigma',
  description: 'Spread of the incident angle likelihood function.',
  defaultValue: 0.89999997615814209,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoNumIterations: IAttribute = {
  name: 'PatchMatchStereo.num_iterations',
  description:
    'Number of coordinate descent iterations. Each iteration consists of four sweeps from left to right, top to bottom, and vice versa.',
  defaultValue: 5,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const PatchMatchStereoGeomConsistency: IAttribute = {
  name: 'PatchMatchStereo.geom_consistency',
  description:
    'Whether to add a regularized geometric consistency term to the cost function. If true, the `depth_maps` and `normal_maps` must not be null.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const PatchMatchStereoGeomConsistencyRegularizer: IAttribute = {
  name: 'PatchMatchStereo.geom_consistency_regularizer',
  description:
    'The relative weight of the geometric consistency term w.r.t. to the photo-consistency term.',
  defaultValue: 0.30000001192092896,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoGeomConsistencyMaxCost: IAttribute = {
  name: 'PatchMatchStereo.geom_consistency_max_cost',
  description:
    'Maximum geometric consistency cost in terms of the forward-backward reprojection error in pixels.',
  defaultValue: 3,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoFilter: IAttribute = {
  name: 'PatchMatchStereo.filter',
  description: 'Whether to enable filtering.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const PatchMatchStereoFilterMinNcc: IAttribute = {
  name: 'PatchMatchStereo.filter_min_ncc',
  description: 'Minimum NCC coefficient for pixel to be photo-consistent.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoFilterMinTriangulationAngle: IAttribute = {
  name: 'PatchMatchStereo.filter_min_triangulation_angle',
  description: 'Minimum triangulation angle to be stable.',
  defaultValue: 0.10000000149011612,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoFilterMinNumConsistent: IAttribute = {
  name: 'PatchMatchStereo.filter_min_num_consistent',
  description:
    'Minimum number of source images have to be consistent for pixel not to be filtered.',
  defaultValue: 2,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const PatchMatchStereoFilterGeomConsistencyMaxCost: IAttribute = {
  name: 'PatchMatchStereo.filter_geom_consistency_max_cost',
  description:
    'Maximum forward-backward reprojection error for pixel to be geometrically consistent.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoCacheSize: IAttribute = {
  name: 'PatchMatchStereo.cache_size',
  defaultValue: 32,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const PatchMatchStereoAllowMissingFiles: IAttribute = {
  name: 'PatchMatchStereo.allow_missing_files',
  description: 'Whether to tolerate missing images/maps in the problem setup',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const PatchMatchStereoWriteConsistencyGraph: IAttribute = {
  name: 'PatchMatchStereo.write_consistency_graph',
  description: 'Whether to write the consistency graph.',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};

const PATCH_MATCH_STEREO_ATTRIBUTES = [
  PatchMatchStereoMaxImageSize,
  PatchMatchStereoGpuIndex,
  PatchMatchStereoDepthMin,
  PatchMatchStereoDepthMax,
  PatchMatchStereoWindowRadius,
  PatchMatchStereoWindowStep,
  PatchMatchStereoSigmaSpatial,
  PatchMatchStereoSigmaColor,
  PatchMatchStereoNumSamples,
  PatchMatchStereoNccSigma,
  PatchMatchStereoMinTriangulationAngle,
  PatchMatchStereoIncidentAngleSigma,
  PatchMatchStereoNumIterations,
  PatchMatchStereoGeomConsistency,
  PatchMatchStereoGeomConsistencyRegularizer,
  PatchMatchStereoGeomConsistencyMaxCost,
  PatchMatchStereoFilter,
  PatchMatchStereoFilterMinNcc,
  PatchMatchStereoFilterMinTriangulationAngle,
  PatchMatchStereoFilterMinNumConsistent,
  PatchMatchStereoFilterGeomConsistencyMaxCost,
  PatchMatchStereoCacheSize,
  PatchMatchStereoAllowMissingFiles,
  PatchMatchStereoWriteConsistencyGraph,
];

export default PATCH_MATCH_STEREO_ATTRIBUTES;
