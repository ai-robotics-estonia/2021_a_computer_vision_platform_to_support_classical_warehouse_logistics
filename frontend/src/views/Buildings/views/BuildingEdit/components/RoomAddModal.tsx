import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import AppFormGroup from '../../../../../components/AppFormGroup';
import BuildingRoomType from '../../../../../types/api/BuildingRoomType';
import useBaseServiceQueries from '../../../../../hooks/useBaseServiceQueries';
import RoomType from '../../../../../types/api/RoomType';
import RoomService from '../../../../../services/RoomService';
import BuildingRoomService from '../../../../../services/BuildingRoomService';

interface PropTypes {
  floor?: number;

  onSubmit?(buildingRoom: BuildingRoomType): void;

  show?: boolean;
  onHide(): void;
}

const RoomAddModal = ({
  floor,
  show,
  onHide,
  onSubmit = () => {},
}: PropTypes) => {
  const form = useForm<BuildingRoomType>({
    defaultValues: {
      floor,
    },
  });
  const { handleSubmit } = form;

  const { useGetAllQuery } = useBaseServiceQueries<RoomType>(RoomService);
  const { useGetAllQuery: useGetAllBuildingRoomsQuery } =
    useBaseServiceQueries<BuildingRoomType>(BuildingRoomService);
  const { data: rooms = [] } = useGetAllQuery();
  const { data: bRooms = [] } = useGetAllBuildingRoomsQuery();
  const usedRooms = bRooms.map(br => br.roomId);

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Add room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppFormGroup.Select
            options={rooms.filter(r => !usedRooms.includes(r.id))}
            getKey={r => r.id}
            getLabel={r => r.name}
            name="roomId"
            label="Room"
            form={form}
            isRequired
          />
          <AppFormGroup
            type="number"
            name="floor"
            label="Floor"
            asNumber
            disabled={!!floor}
            form={form}
            isRequired
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Add</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RoomAddModal;
