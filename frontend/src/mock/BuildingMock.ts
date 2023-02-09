import BuildingType from '../types/api/BuildingType';
import { getDefaultRandomDate } from '../utils/dateUtils';

export const BUILDING1: BuildingType = {
  id: 1,
  name: 'ITC',
  description: '',
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export const BUILDING2: BuildingType = {
  id: 2,
  name: 'Peamaja',
  description: '',
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export const BUILDING3: BuildingType = {
  id: 3,
  name: 'Tudengimaja',
  description: '',
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export default [BUILDING1, BUILDING2, BUILDING3];
