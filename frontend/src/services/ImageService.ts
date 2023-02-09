import BaseService from './base/BaseService';
import CONTROLLER from '../utils/controllers';
import FileService from './base/FileService';
import { UploadOptionsType } from './interfaces/IFileService';
import ImageType from '../types/api/ImageType';

const Base = new BaseService<ImageType>(CONTROLLER.IMAGE);

const ImageService = {
  getById: Base.getById,
  search: Base.search,
  upload: async (
    files: File[] | File,
    roomId: number,
    type: string,
    options: UploadOptionsType
  ) =>
    await FileService.upload(
      `room/${roomId}${CONTROLLER.IMAGE}`,
      {
        roomId: roomId.toString(),
        type,
        files,
      },
      options
    ),
  delete: Base.delete,
};

export default ImageService;
