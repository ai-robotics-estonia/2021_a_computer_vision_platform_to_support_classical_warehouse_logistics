import React from 'react';
import Form from 'react-bootstrap/Form';
import { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface Props<T> {
  errors: FieldErrors<T>;
  name: string;
}

export default function FormControlError<T>({ errors, name }: Props<T>) {
  return (
    <Form.Control.Feedback type="invalid">
      {/* @ts-ignore*/}
      <ErrorMessage errors={errors} name={name} />
    </Form.Control.Feedback>
  );
}
