import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface PropsType {
  onHide?(): void;
}

export default function GlobalCoordinateModal({ onHide }: PropsType) {
  return (
    <Modal show onHide={onHide} size="lg">
      <Modal.Header className="border-0" closeButton />
      <iframe
        width="100%"
        height="500"
        src="https://www.openstreetmap.org/export/embed.html?bbox=24.652183055877686%2C59.39098121996531%2C24.671752452850345%2C59.399840845884015&amp;layer=mapnik"
        style={{ border: '1px solid black' }}
      ></iframe>
    </Modal>
  );
}
