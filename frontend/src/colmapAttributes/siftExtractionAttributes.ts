import IAttribute, { ATTRIBUTE_TYPE } from './IAttribute';

const SiftExtractionFirstOctave: IAttribute = {
  name: 'SiftExtraction.first_octave',
  description:
    'First octave in the pyramid, i.e. -1 upsamples the image by one level.',
  defaultValue: -1,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const SiftExtractionNumOctaves: IAttribute = {
  name: 'SiftExtraction.num_octaves',
  description: 'Number of octaves.',
  defaultValue: 4,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const SiftExtractionOctaveResolution: IAttribute = {
  name: 'SiftExtraction.octave_resolution',
  description: 'Number of levels per octave.',
  defaultValue: 3,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const SiftExtractionPeakThreshold: IAttribute = {
  name: 'SiftExtraction.peak_threshold',
  description: 'Peak threshold for detection.',
  defaultValue: 0.0066666666666666671,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const SiftExtractionEdgeThreshold: IAttribute = {
  name: 'SiftExtraction.edge_threshold',
  description: 'Edge threshold for detection.',
  defaultValue: 10,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const SiftExtractionEstimateAffineShape: IAttribute = {
  name: 'SiftExtraction.estimate_affine_shape',
  description:
    'Estimate affine shape of SIFT features in the form of oriented ellipses as opposed to original SIFT which estimates oriented disks.',
  defaultValue: 1,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const SiftExtractionMaxNumOrientations: IAttribute = {
  name: 'SiftExtraction.max_num_orientations',
  description:
    'Maximum number of orientations per keypoint if not estimate_affine_shape.',
  defaultValue: 2,
  type: ATTRIBUTE_TYPE.NUMBER,
};
const SiftExtractionUpright: IAttribute = {
  name: 'SiftExtraction.upright',
  description: 'Fix the orientation to 0 for upright features.',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const SiftExtractionDomainSizePooling: IAttribute = {
  name: 'SiftExtraction.domain_size_pooling',
  defaultValue: 0,
  type: ATTRIBUTE_TYPE.BOOLEAN,
};
const SiftExtractionDspMinScale: IAttribute = {
  name: 'SiftExtraction.dsp_min_scale',
  defaultValue: 0.16666666666666666,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const SiftExtractionDspMaxScale: IAttribute = {
  name: 'SiftExtraction.dsp_max_scale',
  defaultValue: 3,
  type: ATTRIBUTE_TYPE.FLOAT,
};
const SiftExtractionDspNumScales: IAttribute = {
  name: 'SiftExtraction.dsp_num_scales',
  defaultValue: 10,
  type: ATTRIBUTE_TYPE.NUMBER,
};

export const SIFT_EXTRACTION_ATTRIBUTES = [
  SiftExtractionFirstOctave,
  SiftExtractionNumOctaves,
  SiftExtractionOctaveResolution,
  SiftExtractionPeakThreshold,
  SiftExtractionEdgeThreshold,
  SiftExtractionEstimateAffineShape,
  SiftExtractionMaxNumOrientations,
  SiftExtractionUpright,
  SiftExtractionDomainSizePooling,
  SiftExtractionDspMinScale,
  SiftExtractionDspMaxScale,
  SiftExtractionDspNumScales,
];

export default SIFT_EXTRACTION_ATTRIBUTES;
