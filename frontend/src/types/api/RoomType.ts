import IBaseType from './IBaseType';
import BuildingType from './BuildingType';
import PointCloudType from './PointCloudType';

export default interface RoomType extends IBaseType {
  name: string;
  description: string;

  buildingId?: number;
  building?: BuildingType;

  pointClouds?: PointCloudType[];

  filePath?: string;
}
