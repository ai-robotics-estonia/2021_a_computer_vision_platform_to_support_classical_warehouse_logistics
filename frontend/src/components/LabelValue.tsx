import React, { ReactNode } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Props = {
  label: string;
  value?: ReactNode;
};

const LabelValueInline = ({ label, value }: Props) => {
  return (
    <div>
      <span>
        <b>{label} </b>
      </span>
      <span>{value}</span>
    </div>
  );
};
const LabelValueRow = ({ label, value }: Props) => {
  return (
    <Row>
      <Col>
        <b>{label}</b>
      </Col>
      <Col>{value}</Col>
    </Row>
  );
};

const LabelValueBlock = ({ label, value }: Props) => {
  return (
    <>
      <p className="mb-0">
        <b>{label}</b>
      </p>
      {typeof value === 'object' && value}
      {typeof value !== 'object' && <p className="mb-0">{value}</p>}
    </>
  );
};

interface LabelValueProps extends Props {
  inline?: boolean;
  row?: boolean;
  children?: ReactNode;
  empty?: boolean;
  dep?: boolean;
}

const isEmpty = (value: ReactNode) => {
  return value === undefined || value === null || value === '';
};

export default function LabelValue({
  label,
  children,
  value,
  inline,
  row,
  empty,
  dep,
}: LabelValueProps) {
  if (empty && (isEmpty(value ?? children) || dep === false)) return null;
  if (row) return <LabelValueRow label={label} value={value ?? children} />;
  if (inline)
    return <LabelValueInline label={label} value={value ?? children} />;
  return <LabelValueBlock label={label} value={value ?? children} />;
}
