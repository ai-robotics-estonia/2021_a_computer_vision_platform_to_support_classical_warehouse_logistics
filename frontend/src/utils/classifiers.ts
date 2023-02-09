import SlurmStateType from '../types/api/SlurmStateType';

export const IMAGE_TYPE = {
  CAMERA: 'camera',
  CCTV: 'cctv',
  MASK: 'mask',
};

export const SLURM_STATE: { [T in SlurmStateType]: SlurmStateType } = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
};

export default {};
