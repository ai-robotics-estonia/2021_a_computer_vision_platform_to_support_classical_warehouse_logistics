import PointCloudType from '../types/api/PointCloudType';
import { ROOM1 } from './RoomMock';
import { getDefaultRandomDate } from '../utils/dateUtils';
import SIFT_EXTRACTION_ATTRIBUTES from '../colmapAttributes/siftExtractionAttributes';
import { UnitMatrix } from '../utils/constants';

export const POINT_CLOUD_1: PointCloudType = {
  id: 1,
  matrix: [
    1.32515, 0.23235, 0.41515, 0.4244, 1.233, 0.9823, 0.0234, 1.52, 1.52462,
    0.4234, 4.3042, 0.425, 1.32515, 0.23235, 0.41515, 0.4244,
  ],

  roomId: ROOM1.id,
  slurmId: 0,

  colmapAttributes: JSON.stringify(
    Object.fromEntries(
      SIFT_EXTRACTION_ATTRIBUTES.map(fea => [fea.name, fea.defaultValue])
    )
  ),
  additional: JSON.stringify({
    points: 1_349_200,
    thumbnail: '/image/pointcloud/thumbnail.jpeg',
    avgBlurriness: 0.76,
    ISO: 400,
    queue: 4,
  }),

  startedAt: getDefaultRandomDate().toISOString(),
  queuedAt: getDefaultRandomDate().toISOString(),
  finishedAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
  createdAt: getDefaultRandomDate().toISOString(),
};

export const POINT_CLOUD_2: PointCloudType = {
  id: 2,
  matrix: UnitMatrix,

  roomId: ROOM1.id,
  slurmId: 0,

  colmapAttributes: JSON.stringify(
    Object.fromEntries(
      SIFT_EXTRACTION_ATTRIBUTES.map(fea => [fea.name, fea.defaultValue])
    )
  ),
  additional: JSON.stringify({
    points: 1_149_200,
    thumbnail: '/image/pointcloud/thumbnail.jpeg',
    avgBlurriness: 0.8,
    ISO: 500,
    queue: 1,
  }),

  startedAt: getDefaultRandomDate().toISOString(),
  queuedAt: getDefaultRandomDate().toISOString(),
  finishedAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
  createdAt: getDefaultRandomDate().toISOString(),
};

export const POINT_CLOUD_3: PointCloudType = {
  id: 3,

  roomId: ROOM1.id,
  slurmId: 0,
  slurmExitCode: 3,

  additional: JSON.stringify({
    avgBlurriness: 0.8,
    queue: 0,
  }),

  startedAt: getDefaultRandomDate().toISOString(),
  queuedAt: getDefaultRandomDate().toISOString(),
  finishedAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
  createdAt: getDefaultRandomDate().toISOString(),
};

export const POINT_CLOUD_4: PointCloudType = {
  id: 4,

  roomId: ROOM1.id,
  slurmId: 0,

  additional: JSON.stringify({
    avgBlurriness: 0.75,
    queue: 9,
  }),

  queuedAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
  createdAt: getDefaultRandomDate().toISOString(),
};

export default [POINT_CLOUD_1, POINT_CLOUD_2, POINT_CLOUD_3, POINT_CLOUD_4];
