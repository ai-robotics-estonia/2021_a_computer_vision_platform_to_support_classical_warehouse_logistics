import EventFilteredResultType from './EventFilteredResultType';

export type CameraType = number | string;

export default interface EventRawResultType extends EventFilteredResultType {
  camera: CameraType;
}
