import React, { ReactNode, useState } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';

interface PropsType extends ButtonProps {
  render: (onHide: () => void) => ReactNode;
}

export default function ModalTriggerBtn({
  children,
  onClick = () => {},
  render,
  ...props
}: PropsType) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        {...props}
        onClick={e => {
          setShowModal(true);
          onClick(e);
        }}
      >
        {children}
      </Button>
      {showModal && render(() => setShowModal(false))}
    </>
  );
}
