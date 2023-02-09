import EventFilteredResultType from '../../types/event/EventFilteredResultType';
import EventRawResultType, {
  CameraType,
} from '../../types/event/EventRawResultType';

export const toAlternativeEventPositions = (
  item: EventFilteredResultType,
  camera: CameraType
): EventRawResultType => {
  const xQ = Math.floor(Math.random() * 24) - 12;
  const yQ = Math.floor(Math.random() * 24) - 12;
  const statusQ = Math.random() > 0.6 ? 2 : 1;

  return {
    camera,
    x: item.x + xQ,
    y: item.y + yQ,
    status: statusQ,
  };
};

export const toFilteredEventResult = (
  results: EventRawResultType[][]
): EventFilteredResultType[] => {
  const filtered: EventFilteredResultType[] = [];

  const maxItems = Math.max(...results.map(r => r.length));
  for (let i = 0; i < maxItems; i++) {
    const timeResults = results.map(r => r[i]);

    const filter: EventFilteredResultType = {
      x: Math.avg(...timeResults.map(r => r.x)),
      y: Math.avg(...timeResults.map(r => r.y)),
      status: timeResults.map(r => r.status).findCommon() ?? 1,
      createdAt: timeResults[0].createdAt,
    };
    filtered.push(filter);
  }
  return filtered;
};
