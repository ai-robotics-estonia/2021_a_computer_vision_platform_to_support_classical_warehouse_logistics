import BaseService from './base/BaseService';
import CONTROLLER from '../utils/controllers';
import RoomType from '../types/api/RoomType';

// let Base: IBaseService<RoomType>;
// if (MOCK) Base = new BaseMockService<RoomType>(RoomMock);
const Base = new BaseService<RoomType>(CONTROLLER.ROOM);

const RoomService = {
  ...Base,
  update: (obj: RoomType) => {
    if (obj.pointClouds) delete obj.pointClouds;
    return Base.update(obj);
  },
};

export default RoomService;
