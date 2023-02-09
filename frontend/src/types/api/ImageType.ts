import IBaseType from './IBaseType';
import RoomType from './RoomType';

export default interface ImageType extends IBaseType {
  name: string;

  roomId: number;
  room?: RoomType;

  type: string;

  fileSize?: number;
  resolution?: string;
  blurriness?: number;
}
