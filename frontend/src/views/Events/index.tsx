import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import MainView from '../../components/MainView';
import URLS, { GET_PATH } from '../../utils/urls';
import useBaseServiceQueries from '../../hooks/useBaseServiceQueries';
import RoomService from '../../services/RoomService';
import EventService from '../../services/EventService';
import EventActionsStack from '../../components/event/EventActionsStack';
import { byId } from '../../utils/sorters/apiTypeSorts';

export default function Events() {
  const { useGetAllQuery } = useBaseServiceQueries(EventService);
  const { useGetAllQuery: useGetAllRoomsQuery } =
    useBaseServiceQueries(RoomService);
  const { data: allEvents = [] } = useGetAllQuery();
  const { data: allRooms = [] } = useGetAllRoomsQuery();

  const tableData = allEvents
    .map(e => {
      return { ...e, room: allRooms.find(r => r.id === 1) };
    })
    .sort(byId);

  return (
    <MainView>
      <MainView.Header title="Events" />
      <MainView.Content>
        <Table striped hover>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col width="0" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Cameras</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(r => {
              const { id, name, room, createdAt } = r;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>
                    <NavLink to={GET_PATH.ROOM_DETAILS(room?.id ?? 0)}>
                      {room?.name}
                    </NavLink>
                  </td>
                  <td>2</td>
                  <td>{createdAt?.toDisplayDateTime()}</td>
                  <td>
                    <EventActionsStack id={id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <NavLink to={URLS.EVENTS_NEW}>
          <Button className="px-5">+</Button>
        </NavLink>
      </MainView.Content>
    </MainView>
  );
}
