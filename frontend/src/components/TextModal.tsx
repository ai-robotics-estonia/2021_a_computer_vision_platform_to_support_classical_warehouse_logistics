import React from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';

interface PropsType extends ModalProps {
  title: string;
  body?: string;
  monospace?: boolean;
  onHide?(): void;
}

export default function TextModal({
  body,
  title,
  monospace,
  children,
  ...props
}: PropsType) {
  return (
    <Modal show {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          whiteSpace: 'break-spaces',
          fontFamily: monospace ? 'monospace' : undefined,
        }}
      >
        {body ?? children}
      </Modal.Body>
    </Modal>
  );
}
