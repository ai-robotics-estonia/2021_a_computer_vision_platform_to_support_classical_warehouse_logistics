export const URLS = {
  ROOT: '/',

  BUILDINGS: '/buildings',
  BUILDINGS_NEW: '/buildings/new',

  ROOMS: '/rooms',
  ROOMS_NEW: '/rooms/new',

  EVENTS: '/events',
  EVENTS_NEW: '/events/new',

  TOOLS: {
    ROOM_EDITOR: '/tools/room-editor',
    BUILDING_EDITOR: '/tools/building-editor',
    MAP: '/tools/map',
    POINT_CLOUD: '/tools/point-cloud',
    CAMERA_MATRIX: '/tools/camera-matrix',
    CAMERA_COLLECTION: '/tools/camera-collection',
    EVENT: '/tools/event',
  },

  COMPONENTS: '/components',
  ICONS: '/icons',

  LOGOUT: '/logout',
  REGISTER: '/register',
};

export const PATHS = {
  ROOM: `${URLS.ROOMS}/:id`,
  ROOM_EDIT: `${URLS.ROOMS}/:id/edit`,

  BUILDING: `${URLS.BUILDINGS}/:id`,
  BUILDING_EDIT: `${URLS.BUILDINGS}/:id/edit`,

  EVENT: `${URLS.EVENTS}/:id`,
};

export const GET_PATH = {
  ROOM_DETAILS(roomId: number) {
    return `${URLS.ROOMS}/${roomId}`;
  },
  ROOM_EDIT(roomId: number) {
    return `${URLS.ROOMS}/${roomId}/edit`;
  },
  ROOM_POINT_CLOUD(pointCloudId: number) {
    return `/potree?point_cloud=${pointCloudId}`;
  },
  BUILDING_DETAILS(buildingId: number) {
    return `${URLS.BUILDINGS}/${buildingId}`;
  },
  BUILDING_EDIT(buildingId: number) {
    return `${URLS.BUILDINGS}/${buildingId}/edit`;
  },
  EVENT_DETAILS(eventId: number) {
    return `${URLS.EVENTS}/${eventId}`;
  },
};

export default URLS;
