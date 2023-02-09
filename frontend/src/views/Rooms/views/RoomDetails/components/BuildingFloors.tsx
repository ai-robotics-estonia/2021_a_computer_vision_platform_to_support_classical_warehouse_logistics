import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import BuildingRoomType from '../../../../../types/api/BuildingRoomType';
import RoomType from '../../../../../types/api/RoomType';
import { whereIsUnique } from '../../../../../utils/filters/arrayFilters';
import RoomActionsStack from '../../../../../components/room/RoomActionsStack';
import AddRoomBtn from '../../../../../components/building/AddRoomBtn';

type Props = {
  buildingRooms: BuildingRoomType[];
  rooms: RoomType[];
  className?: string;
  onRoomAdd?(buildingRoom: BuildingRoomType): void;
};

export default function BuildingFloors({
  buildingRooms,
  rooms,
  className = '',
  onRoomAdd,
}: Props) {
  return (
    <Accordion className={className}>
      {buildingRooms
        .map(br => br.floor)
        .filter(whereIsUnique)
        .map(floor => (
          <Accordion.Item key={floor} eventKey={floor.toString()}>
            <Accordion.Header>Floor {floor.toString()}</Accordion.Header>
            <Accordion.Body>
              <Table striped hover>
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col width="0" />
                </colgroup>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Is point cloud</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms
                    .filter(r =>
                      buildingRooms
                        .filter(br => br.floor === floor)
                        .map(br => br.roomId)
                        .includes(r.id)
                    )
                    .map(r => {
                      const { id, name } = r;
                      return (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>{name}</td>
                          <td>false</td>
                          <td>
                            <RoomActionsStack id={id} />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <AddRoomBtn onSubmit={onRoomAdd} floor={floor}>
                Add Room
              </AddRoomBtn>
            </Accordion.Body>
          </Accordion.Item>
        ))}
    </Accordion>
  );
}
