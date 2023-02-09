import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import IAttribute, {
  ATTRIBUTE_TYPE,
} from '../../../../../../colmapAttributes/IAttribute';
import AppFormGroup from '../../../../../../components/AppFormGroup';
import ColmapFormType from './ColmapFormType';
import { formHookDotEncoder } from './utils';

interface ColmapInputType {
  attribute: IAttribute;
  form: UseFormReturn<ColmapFormType>;
}

export default function ColmapAttributeControl({
  attribute: { description, type, name },
  form,
}: ColmapInputType) {
  if (type === ATTRIBUTE_TYPE.BOOLEAN)
    return (
      <AppFormGroup.Switch
        row
        readMore={description}
        name={formHookDotEncoder(name)}
        form={form}
        controlClassName="mb-3"
        label={name + ': '}
      />
    );

  return (
    <AppFormGroup
      readMore={description}
      row
      name={formHookDotEncoder(name)}
      form={form}
      type="number"
      asNumber
      label={name + ': '}
    />
  );
}
