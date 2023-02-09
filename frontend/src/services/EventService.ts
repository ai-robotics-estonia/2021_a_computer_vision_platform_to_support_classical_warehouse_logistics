import IBaseService from './interfaces/IBaseService';
import BaseMockService from '../mock/services/BaseMockService';
import BaseService from './base/BaseService';
import { MOCK } from '../config';
import CONTROLLER from '../utils/controllers';
import EventType from '../types/api/EventType';
import EventMock from '../mock/EventMock';

let Base: IBaseService<EventType>;
if (MOCK) Base = new BaseMockService<EventType>(EventMock);
else Base = new BaseService<EventType>(CONTROLLER.ROOM);

const EventService = {
  ...Base,
};

export default EventService;
