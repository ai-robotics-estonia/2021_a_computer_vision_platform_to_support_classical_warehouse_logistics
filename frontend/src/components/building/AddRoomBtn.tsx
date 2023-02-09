import React, { ReactNode, useState } from 'react';
import Button from 'react-bootstrap/Button';
import RoomAddModal from '../../views/Buildings/views/BuildingEdit/components/RoomAddModal';
import BuildingRoomType from '../../types/api/BuildingRoomType';

type Props = {
  floor?: number;
  children?: ReactNode;
  onSubmit?(buildingRoom: BuildingRoomType): void;
};

export default function AddRoomBtn({ floor, children, onSubmit }: Props) {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={showModal}>
        {children}
      </Button>
      <RoomAddModal
        onSubmit={onSubmit}
        floor={floor}
        show={show}
        onHide={hideModal}
      />
    </>
  );
}
