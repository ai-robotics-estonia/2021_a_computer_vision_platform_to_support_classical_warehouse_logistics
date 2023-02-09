import URLS from './urls';

interface Link {
  url?: string;
  label: string;
}

const links: Link[] = [
  {
    url: URLS.ROOT,
    label: 'Home',
  },
  {
    url: URLS.ROOMS,
    label: 'Rooms',
  },
  {
    url: URLS.BUILDINGS,
    label: 'Buildings',
  },
  {
    url: URLS.EVENTS,
    label: 'Events',
  },
  {
    label: 'TOOLS',
  },
  {
    url: URLS.TOOLS.POINT_CLOUD,
    label: 'Point cloud',
  },
  {
    url: URLS.TOOLS.CAMERA_MATRIX,
    label: 'Camera Matrix',
  },
  {
    url: URLS.TOOLS.CAMERA_COLLECTION,
    label: 'Camera Collection',
  },
  {
    url: URLS.TOOLS.EVENT,
    label: 'Event',
  },
  {
    label: 'UTILS',
  },
  {
    url: URLS.COMPONENTS,
    label: 'Components',
  },
  // {
  //   url: URLS.ICONS,
  //   label: 'Icons',
  // },
  {
    url: URLS.LOGOUT,
    label: 'Logout',
  },
];

export default links;
