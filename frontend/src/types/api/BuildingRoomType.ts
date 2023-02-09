import IBaseType from './IBaseType';
import BuildingType from './BuildingType';
import RoomType from './RoomType';

export default interface BuildingRoomType extends IBaseType {
  buildingId: number;
  building?: BuildingType;

  roomId: number;
  room?: RoomType;

  floor: number;
}
