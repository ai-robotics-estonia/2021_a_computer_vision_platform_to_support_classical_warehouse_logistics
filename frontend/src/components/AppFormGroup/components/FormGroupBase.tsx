import React, { ReactNode } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FieldErrors } from 'react-hook-form';
import FormControlError from '../../FormControlError';
import ReadMore from '../../ReadMore';

export interface FormGroupBaseProps {
  name: string;
  isRequired?: boolean;
  label: string;
  readMore?: string;
  row?: boolean;
}

interface Props<T> extends FormGroupBaseProps {
  children: ReactNode;
  errors: FieldErrors<T>;
}

export default function FormGroupBase<T>({
  name,
  isRequired,
  label,
  children,
  errors,
  readMore,
  row,
}: Props<T>) {
  return (
    <Form.Group controlId={name}>
      {row && (
        <Row>
          <Col>
            <Form.Label className={isRequired ? 'required' : ''}>
              {label}
            </Form.Label>
            {readMore && <ReadMore text={readMore} />}
          </Col>
          <Col>{children}</Col>
        </Row>
      )}
      {!row && (
        <Form.Label className={isRequired ? 'required' : ''}>
          {label}
        </Form.Label>
      )}

      {!row && children}
      <FormControlError errors={errors} name={name} />
    </Form.Group>
  );
}
