import IBaseType from './IBaseType';
import RoomType from './RoomType';
import SlurmStateType from './SlurmStateType';

export default interface PointCloudType extends IBaseType {
  roomId: number;
  room?: RoomType;

  matrix?: number[];
  filePath?: string;
  pointCount?: number;

  colmapAttributes?: string | { [key: string]: number }; // JSON
  additional?: string; // JSON

  slurmId: number;
  slurmExitCode?: number;

  slurmState?: SlurmStateType; //

  startedAt?: string;
  queuedAt?: string;
  finishedAt?: string;
}

// CAMERA: QW, QX, QY, QZ, TX, TY, TZ, NAME
