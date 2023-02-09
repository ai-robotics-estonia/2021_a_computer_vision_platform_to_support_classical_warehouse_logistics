import BaseService from './base/BaseService';
import CONTROLLER from '../utils/controllers';
import PointCloudType from '../types/api/PointCloudType';
import FileService from './base/FileService';
import STATIC_FILES from '../utils/staticFiles';

const Base = new BaseService<PointCloudType>(CONTROLLER.POINT_CLOUD);

const PointCloudService = {
  ...Base,
  getLog: (pointCloud: PointCloudType) =>
    FileService.getAsText(
      `${STATIC_FILES.GENERATED}/${pointCloud.filePath}/logs.txt`
    ),
  getImageTransformations: () => {},
  getCameraTransformations: () => {},
};

export default PointCloudService;
