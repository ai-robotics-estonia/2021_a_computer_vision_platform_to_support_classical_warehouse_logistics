import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import MainView from '../../components/MainView';
import URLS, { GET_PATH } from '../../utils/urls';
import useBaseServiceQueries from '../../hooks/useBaseServiceQueries';
import RoomService from '../../services/RoomService';
import BuildingRoomService from '../../services/BuildingRoomService';
import BuildingService from '../../services/BuildingService';
import RoomActionsStack from '../../components/room/RoomActionsStack';
import { byId } from '../../utils/sorters/apiTypeSorts';
import './style.scss';

const Rooms = () => {
  const { useGetAllQuery } = useBaseServiceQueries(RoomService);
  const { useGetAllQuery: useGetAllBuildingRoomsQuery } =
    useBaseServiceQueries(BuildingRoomService);
  const { useGetAllQuery: useGetAllBuildingsQuery } =
    useBaseServiceQueries(BuildingService);
  const { data: allRooms = [] } = useGetAllQuery();
  const { data: allBuildingRooms = [] } = useGetAllBuildingRoomsQuery();
  const { data: allBuildings = [] } = useGetAllBuildingsQuery();

  const tableData = allRooms
    .map(r => {
      const buildingRoom = allBuildingRooms.find(br => br.roomId === r.id);
      return {
        ...r,
        building: allBuildings.find(b => b.id === buildingRoom?.buildingId),
        floor: buildingRoom?.floor,
      };
    })
    .sort(byId);

  return (
    <MainView>
      <MainView.Header title="Rooms" />
      <MainView.Content>
        <Table striped hover>
          <colgroup>
            <col />
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
              <th>Is point cloud</th>
              <th>Building</th>
              <th>Floor</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(r => {
              const { id, name, building, floor, createdAt } = r;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>false</td>
                  <td>
                    <NavLink to={GET_PATH.BUILDING_DETAILS(building?.id ?? 0)}>
                      {building?.name}
                    </NavLink>
                  </td>
                  <td>{floor}</td>
                  <td>{createdAt?.toDisplayDateTime()}</td>
                  <td>
                    <RoomActionsStack id={id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <NavLink to={URLS.ROOMS_NEW}>
          <Button className="px-5"> + </Button>
        </NavLink>
      </MainView.Content>
    </MainView>
  );
};

export default Rooms;
