import React from 'react';
import { Accordion } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import IAttribute from '../../../../../../colmapAttributes/IAttribute';
import ColmapAttributeControl from './ColmapAttributeControl';
import ColmapFormType from './ColmapFormType';

interface PropsType {
  title: string;
  attributes: IAttribute[];
  form: UseFormReturn<ColmapFormType>;
}

export default function ColmapAttributeSection({
  title,
  attributes,
  form,
}: PropsType) {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey={title}>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>
            {attributes.map(attr => (
              <ColmapAttributeControl
                key={attr.name}
                attribute={attr}
                form={form}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
