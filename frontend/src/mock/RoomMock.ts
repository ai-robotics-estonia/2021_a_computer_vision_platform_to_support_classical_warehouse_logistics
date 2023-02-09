import RoomType from '../types/api/RoomType';
import { getDefaultRandomDate } from '../utils/dateUtils';

export const ROOM1: RoomType = {
  id: 1,
  name: 'ICT 405',
  description: 'Klassiruum',
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export const ROOM2: RoomType = {
  id: 2,
  name: 'ICT 306',
  description: 'Klassiruum',
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export const ROOM3: RoomType = {
  id: 3,
  name: 'ICT 406',
  description: 'Klassiruum',
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export const ROOM4: RoomType = {
  id: 4,
  name: 'U06-329',
  description: 'Klassiruum',
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export default [ROOM1, ROOM2, ROOM3, ROOM4];
