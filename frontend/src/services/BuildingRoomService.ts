import IBaseService from './interfaces/IBaseService';
import BaseService from './base/BaseService';
import CONTROLLER from '../utils/controllers';
import BuildingRoomType from '../types/api/BuildingRoomType';
import BaseMockService from '../mock/services/BaseMockService';
import BuildingRoomMock from '../mock/BuildingRoomMock';
import { MOCK } from '../config';

let Base: IBaseService<BuildingRoomType>;
if (MOCK) Base = new BaseMockService<BuildingRoomType>(BuildingRoomMock);
else Base = new BaseService<BuildingRoomType>(CONTROLLER.BUILDING_ROOM);

const BuildingRoomService = {
  ...Base,
};

export default BuildingRoomService;
