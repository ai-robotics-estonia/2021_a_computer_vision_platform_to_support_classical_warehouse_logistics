import IBaseType from './IBaseType';
import EventResultType from '../event/EventResultType';

export default interface EventRunType extends IBaseType {
  EventId: number;
  description?: string;
  attributes?: { [key: string]: number };
  result: EventResultType;
}
