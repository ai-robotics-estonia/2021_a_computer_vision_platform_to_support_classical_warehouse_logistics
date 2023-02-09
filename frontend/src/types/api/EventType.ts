import IBaseType from './IBaseType';
import PointCloudType from './PointCloudType';

export default interface EventType extends IBaseType {
  name: string;
  description: string;

  pointCloudId: number;
  pointCloud?: PointCloudType;
}
