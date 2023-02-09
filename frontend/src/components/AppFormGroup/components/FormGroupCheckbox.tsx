import React from 'react';
import Form from 'react-bootstrap/Form';
import ErrorMessages from '../../../utils/errorMessages';
import FormControlError from '../../FormControlError';
import TypelessPropsType from '../types/TypelessPropsType';

export default function FormGroupCheckbox<T>({
  name,
  isRequired,
  form,
  disabled,
  label,
  controlClassName,
  row,
}: TypelessPropsType<T>) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <Form.Group controlId={name}>
      {!row && <br />}
      <Form.Check
        {...register(name, {
          required: isRequired ? ErrorMessages.REQUIRED : undefined,
        })}
        type="checkbox"
        className={controlClassName}
        disabled={disabled}
        id={name}
        label={label}
      />
      <FormControlError errors={errors} name={name} />
    </Form.Group>
  );
}
