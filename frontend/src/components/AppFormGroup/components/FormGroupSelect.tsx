import React, { ReactNode } from 'react';
import Form from 'react-bootstrap/Form';
import TypelessPropsType from '../types/TypelessPropsType';
import ErrorMessages from '../../../utils/errorMessages';
import FormGroupBase from './FormGroupBase';

interface PropsType<T, S> extends TypelessPropsType<T> {
  options?: S[];
  getKey(option: S): string | number;
  getLabel(option: S): ReactNode;
  onChange?(values: S[]): void;
}

export default function FormGroupSelect<T, S>({
  name,
  isRequired,
  form,
  disabled,
  readMore,
  label,
  controlClassName,
  placeholder,
  options = [],
  getLabel = () => '',
  getKey,
  row,
}: PropsType<T, S>) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const registered = register(name, {
    required: isRequired ? ErrorMessages.REQUIRED : undefined, // Todo: Type of email auto reqex;
  });
  return (
    <FormGroupBase
      name={name}
      isRequired={isRequired}
      label={label}
      readMore={readMore}
      errors={errors}
      row={row}
    >
      <Form.Select
        {...registered}
        ref={undefined}
        onChange={async e => {
          const values = options?.filter(
            o => getKey(o).toString() === e.target.value
          );
          if (!values.length) return;
          const value = values[0];
          // @ts-ignore
          await setValue(name, getKey(value));
        }}
        placeholder={placeholder}
        disabled={disabled}
        // @ts-ignore
        isInvalid={!!errors?.[name]}
        className={controlClassName}
      >
        <option disabled selected value="">
          -- Select an option --
        </option>

        {options.map(o => (
          <option key={getKey(o)} value={getKey(o)}>
            {getLabel(o)}
          </option>
        ))}
      </Form.Select>
    </FormGroupBase>
  );
}
