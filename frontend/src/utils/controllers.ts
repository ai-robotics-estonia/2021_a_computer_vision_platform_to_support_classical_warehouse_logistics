const CONTROLLER = {
  ROOM: '/rooms',
  IMAGE: '/images',
  BUILDING_ROOM: '/buildingRooms',
  POINT_CLOUD: '/pc',
  BUILDING: '/building',
  AUTH_LOGIN: '/auth/login',
  AUTH_USER: '/auth/user',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
};

export const GET_CONTROLLER = {
  ROOM_DETAILS(roomId: number) {
    return `/${CONTROLLER.ROOM}/${roomId}`;
  },
  ROOM_JOB(roomId: number) {
    return `${CONTROLLER.ROOM}/${roomId}/jobs`;
  },
  ROOM_IMAGES(roomId: number) {
    return `${CONTROLLER.ROOM}/${roomId}/images`;
  },
};

export default CONTROLLER;
