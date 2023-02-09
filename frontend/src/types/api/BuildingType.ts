import IBaseType from './IBaseType';
import RoomType from './RoomType';
import BuildingRoomType from './BuildingRoomType';

export default interface BuildingType extends IBaseType {
  name: string;
  description: string;

  buildingRooms?: BuildingRoomType[];
  rooms?: RoomType[];
}
