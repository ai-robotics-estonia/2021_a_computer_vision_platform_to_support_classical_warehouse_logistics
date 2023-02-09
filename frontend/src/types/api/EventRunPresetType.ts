import IBaseType from './IBaseType';

export default interface EventRunPresetType extends IBaseType {
  name?: string;
  description?: string;
  attributes?: { [key: string]: number };
}
