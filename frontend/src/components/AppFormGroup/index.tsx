import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { FormControlProps } from 'react-bootstrap/FormControl';
import FormGroupSelect from './components/FormGroupSelect';
import FormGroupCheckbox from './components/FormGroupCheckbox';
import TypelessPropsType from './types/TypelessPropsType';
import ErrorMessages from '../../utils/errorMessages';
import FormGroupBase from './components/FormGroupBase';
import FormGroupFileUpload from './components/FormGroupFileUpload';
import FormGroupSwitch from './components/FormGroupSwitch';

interface Props<T> extends TypelessPropsType<T> {
  type?: FormControlProps['type'];
  as?: 'textarea' & React.ElementType;
  rows?: number;
  min?: number;
  asNumber?: boolean;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const AppFormGroup = function <T>({
  name,
  isRequired,
  form,
  label,
  placeholder,
  controlClassName,
  asNumber,
  type = 'text',
  readMore,
  as,
  rows,
  min,
  disabled,
  onChange = () => {},
  row,
}: Props<T>) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;
  const registered = register(name, {
    required: isRequired ? ErrorMessages.REQUIRED : undefined, // Todo: Type of email auto reqex;
  });
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (asNumber && type === 'number') {
      const val = e.target.value ? Number(e.target.value) : undefined;
      // @ts-ignore
      await setValue(name, val);
    } else await registered.onChange(e);
    onChange(e);
  };
  return (
    <FormGroupBase
      name={name}
      isRequired={isRequired}
      label={label}
      readMore={readMore}
      errors={errors}
      row={row}
    >
      <Form.Control
        {...registered}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        as={as}
        rows={rows}
        min={min}
        disabled={disabled}
        // @ts-ignore
        isInvalid={!!errors?.[name]}
        className={controlClassName}
      />
    </FormGroupBase>
  );
};

AppFormGroup.Select = FormGroupSelect;
AppFormGroup.Checkbox = FormGroupCheckbox;
AppFormGroup.Switch = FormGroupSwitch;
AppFormGroup.FileUpload = FormGroupFileUpload;

export default AppFormGroup;
