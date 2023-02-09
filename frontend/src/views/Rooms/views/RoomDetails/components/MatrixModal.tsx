import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface PropsType {
  title: string;
  matrix: number[];
  columns: number;
  onHide?(): void;
}

export default function MatrixModal({
  title,
  matrix,
  columns,
  onHide = () => {},
}: PropsType) {
  return (
    <Modal onHide={onHide} show size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: ' 1fr'.repeat(columns),
          }}
        >
          {matrix.map((i, index) => (
            <div key={i.toString() + index.toString()}>{i}</div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
