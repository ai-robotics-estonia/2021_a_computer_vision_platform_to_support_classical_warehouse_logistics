import React from 'react';
import Form from 'react-bootstrap/Form';
import TypelessPropsType from '../types/TypelessPropsType';
import ErrorMessages from '../../../utils/errorMessages';
import FormGroupBase from './FormGroupBase';
import FormControlError from '../../FormControlError';

export default function FormGroupSwitch<T>({
  name,
  isRequired,
  form,
  disabled,
  readMore,
  label,
  controlClassName,
  row,
}: TypelessPropsType<T>) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <FormGroupBase
      name={name}
      isRequired={isRequired}
      label={label}
      readMore={readMore}
      errors={errors}
      row={row}
    >
      <Form.Check
        {...register(name, {
          required: isRequired ? ErrorMessages.REQUIRED : undefined,
        })}
        type="switch"
        className={controlClassName}
        disabled={disabled}
        id={name}
      />
      <FormControlError errors={errors} name={name} />
    </FormGroupBase>
  );
}
