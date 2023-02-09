type AttributeType = 'NUMBER' | 'FLOAT' | 'BOOLEAN';

export const ATTRIBUTE_TYPE: { [key in AttributeType]: AttributeType } = {
  NUMBER: 'NUMBER',
  FLOAT: 'FLOAT',
  BOOLEAN: 'BOOLEAN',
};

export default interface IAttribute {
  name: string;
  description?: string;
  defaultValue: number;
  type: AttributeType;
  min?: number;
  max?: number;
}
