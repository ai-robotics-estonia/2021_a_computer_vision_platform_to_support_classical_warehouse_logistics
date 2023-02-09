import React from 'react';
import Modal from 'react-bootstrap/Modal';
import LabelValue from '../../../../../components/LabelValue';
import ColmapAttributes from '../../../../../colmapAttributes';
import IAttribute from '../../../../../colmapAttributes/IAttribute';

interface ValueProps {
  attribute?: IAttribute;
  value: number;
}

const ConfigurationValue = ({ attribute, value }: ValueProps) => {
  if (!attribute) return null;
  return <LabelValue label={attribute.name + ':'} value={value} row />;
};

interface PropsType {
  onHide?(): void;
  attributes: { [key in string]: number };
}

export default function ColmapConfigurationModal({
  attributes,
  onHide,
}: PropsType) {
  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Colmap configuration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(attributes).map(key => (
          <ConfigurationValue
            key={key}
            attribute={ColmapAttributes.find(
              ca => ca.name.replace('.', '_') === key
            )}
            value={attributes[key]}
          />
        ))}
        {!Object.keys(attributes).length && 'No attributes listed'}
      </Modal.Body>
    </Modal>
  );
}
