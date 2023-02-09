import IBaseType from './IBaseType';
import RoomType from './RoomType';

export default interface LandmarkType extends IBaseType {
  name: string;
  roomId: number;
  room: RoomType;

  data: string; // Json parsed  location/shape/type/meta
}
