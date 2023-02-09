import IBaseService from './interfaces/IBaseService';
import BaseMockService from '../mock/services/BaseMockService';
import BaseService from './base/BaseService';
import { MOCK } from '../config';
import CONTROLLER from '../utils/controllers';
import BuildingType from '../types/api/BuildingType';
import BuildingMock from '../mock/BuildingMock';

let Base: IBaseService<BuildingType>;
if (MOCK) Base = new BaseMockService<BuildingType>(BuildingMock);
else Base = new BaseService<BuildingType>(CONTROLLER.ROOM);

const BuildingService = {
  ...Base,
};

export default BuildingService;
