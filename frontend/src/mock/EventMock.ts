import EventType from '../types/api/EventType';
import { getDefaultRandomDate } from '../utils/dateUtils';
import { POINT_CLOUD_1, POINT_CLOUD_2 } from './PointCloudMock';

export const EVENT1: EventType = {
  id: 1,
  name: '1 rokla',
  description: '',
  pointCloudId: POINT_CLOUD_1.id,
  createdAt: getDefaultRandomDate().toISOString(),
};

export const EVENT2: EventType = {
  id: 2,
  name: '2 roklat',
  description: '',
  pointCloudId: POINT_CLOUD_1.id,
  createdAt: getDefaultRandomDate().toISOString(),
};

export const EVENT3: EventType = {
  id: 3,
  name: 'Toomine',
  description: '',
  pointCloudId: POINT_CLOUD_2.id,
  createdAt: getDefaultRandomDate().toISOString(),
};

export const EVENT4: EventType = {
  id: 4,
  name: 'Võtmine',
  description: '',
  pointCloudId: POINT_CLOUD_2.id,
  createdAt: getDefaultRandomDate().toISOString(),
};

export default [EVENT1, EVENT2, EVENT3, EVENT4];
