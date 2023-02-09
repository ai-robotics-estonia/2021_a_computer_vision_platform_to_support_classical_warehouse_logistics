import React from 'react';
import Dropzone from 'react-dropzone';
import FormGroupBase from './FormGroupBase';
import TypelessPropsType from '../types/TypelessPropsType';

export default function FormGroupFileUpload<T>({
  name,
  isRequired,
  label,
  readMore,
  form,
}: TypelessPropsType<T>) {
  const {
    formState: { errors },
  } = form;

  return (
    <FormGroupBase
      name={name}
      isRequired={isRequired}
      label={label}
      readMore={readMore}
      errors={errors}
    >
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </FormGroupBase>
  );
}
