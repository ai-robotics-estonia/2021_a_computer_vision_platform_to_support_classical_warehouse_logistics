import EventFilteredResultType from '../types/event/EventFilteredResultType';
import {
  toAlternativeEventPositions,
  toFilteredEventResult,
} from '../utils/mappers/eventMappers';
import EventRawResultType from '../types/event/EventRawResultType';
import EventResultType from '../types/event/EventResultType';

const DEMO_RESULT1: EventFilteredResultType[] = [
  {
    x: 300,
    y: 390,
    status: 1,
  },
  {
    x: 320,
    y: 400,
    status: 1,
  },
  {
    x: 360,
    y: 395,
    status: 1,
  },
  {
    x: 400,
    y: 420,
    status: 2,
  },
  {
    x: 430,
    y: 425,
    status: 2,
  },
  {
    x: 450,
    y: 435,
    status: 1,
  },
  {
    x: 475,
    y: 448,
    status: 1,
  },
  {
    x: 500,
    y: 460,
    status: 2,
  },
  {
    x: 520,
    y: 435,
    status: 1,
  },
];

export const EVENT_RAW_RESULT1: EventRawResultType[] = DEMO_RESULT1.map(i =>
  toAlternativeEventPositions(i, 'camera1')
);

export const EVENT_RAW_RESULT2: EventRawResultType[] = DEMO_RESULT1.map(i =>
  toAlternativeEventPositions(i, 'camera2')
);

export const EVENT_RAW_RESULT3: EventRawResultType[] = DEMO_RESULT1.map(i =>
  toAlternativeEventPositions(i, 'camera3')
);

export const EVENT_RESULT1: EventResultType = {
  raw: [...EVENT_RAW_RESULT1, ...EVENT_RAW_RESULT2, ...EVENT_RAW_RESULT3],
  filtered: toFilteredEventResult([
    EVENT_RAW_RESULT1,
    EVENT_RAW_RESULT2,
    EVENT_RAW_RESULT3,
  ]),
};
