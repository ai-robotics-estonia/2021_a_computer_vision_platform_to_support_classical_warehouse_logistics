import BuildingRoomType from '../types/api/BuildingRoomType';
import { ROOM1, ROOM2, ROOM3 } from './RoomMock';
import { BUILDING1 } from './BuildingMock';

export const BUILDING_ROOM1: BuildingRoomType = {
  id: 1,
  roomId: ROOM1.id,
  buildingId: BUILDING1.id,
  floor: 4,
};

export const BUILDING_ROOM2: BuildingRoomType = {
  id: 2,
  roomId: ROOM2.id,
  buildingId: BUILDING1.id,
  floor: 3,
};

export const BUILDING_ROOM3: BuildingRoomType = {
  id: 3,
  roomId: ROOM3.id,
  buildingId: BUILDING1.id,
  floor: 4,
};

export default [BUILDING_ROOM1, BUILDING_ROOM2, BUILDING_ROOM3];
