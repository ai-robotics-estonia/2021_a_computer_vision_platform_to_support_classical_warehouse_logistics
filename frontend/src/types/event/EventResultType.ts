import EventFilteredResultType from './EventFilteredResultType';
import EventRawResultType from './EventRawResultType';

export default interface EventResultType {
  raw?: EventRawResultType[];
  filtered?: EventFilteredResultType[];
}
