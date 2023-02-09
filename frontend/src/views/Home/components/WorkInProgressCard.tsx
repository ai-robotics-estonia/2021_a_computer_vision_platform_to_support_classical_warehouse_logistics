import React from 'react';
import Card from 'react-bootstrap/Card';
import LabelValue from '../../../components/LabelValue';

export interface WorkProgressType {
  id: string | number;
  name: string;
  status: string;
}

interface PropsType {
  works: WorkProgressType[];
}

export default function WorkInProgressCard({ works }: PropsType) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Work in progress</Card.Title>
      </Card.Header>
      <Card.Body>
        {works.map(w => (
          <LabelValue key={w.id} label={w.name} value={w.status} row />
        ))}
        {!works.length && <span className="opacity-50">Nothing...</span>}
      </Card.Body>
    </Card>
  );
}
