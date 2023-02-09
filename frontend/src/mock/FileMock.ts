import IFileDto from '../components/AppFileUpload/IFileDto';
import { toFile } from '../components/AppFileUpload/mappers';

export const FILE_1: IFileDto = {
  fileObject: toFile('CAM-00001.jpg', 2000),
  progress: 100,
};

export const FILE_2: IFileDto = {
  fileObject: toFile('CAM-00001.jpg', 0),
  progress: 0,
  error: 'File already exists',
};

export const FILE_3: IFileDto = {
  fileObject: toFile('COM-000141_2022-12-19_19-30.png', 0),
  progress: 67,
};

export default [FILE_1, FILE_2, FILE_3];
