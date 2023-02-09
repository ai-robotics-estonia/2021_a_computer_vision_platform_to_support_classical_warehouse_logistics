import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import MainView from '../../components/MainView';
import URLS from '../../utils/urls';
import useBaseServiceQueries from '../../hooks/useBaseServiceQueries';
import BuildingService from '../../services/BuildingService';
import BuildingRoomService from '../../services/BuildingRoomService';
import { whereIsUnique } from '../../utils/filters/arrayFilters';
import { byId } from '../../utils/sorters/apiTypeSorts';
import BuildingActionsStack from '../../components/building/BuildingActionStack';
import './style.scss';

const Buildings = () => {
  const { useGetAllQuery } = useBaseServiceQueries(BuildingService);
  const { useGetAllQuery: useGetAllBuildingRoomsQuery } =
    useBaseServiceQueries(BuildingRoomService);
  const { data: allBuildings = [] } = useGetAllQuery();
  const { data: allBuildingRooms = [] } = useGetAllBuildingRoomsQuery();

  const tableData = allBuildings
    .map(b => {
      const buildingRooms = allBuildingRooms.filter(
        br => br.buildingId === b.id
      );
      return {
        ...b,
        rooms: buildingRooms.length,
        floors: buildingRooms.map(br => br.floor).filter(whereIsUnique).length,
      };
    })
    .sort(byId);

  return (
    <MainView>
      <MainView.Header title="Buildings" />
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
              <th>Rooms</th>
              <th>Floors</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(r => {
              const { id, name, rooms, floors, createdAt } = r;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{rooms}</td>
                  <td>{floors}</td>
                  <td>{createdAt?.toDisplayDateTime()}</td>
                  <td>
                    <BuildingActionsStack id={id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <NavLink to={URLS.BUILDINGS_NEW}>
          <Button className="px-5">+</Button>
        </NavLink>
      </MainView.Content>
    </MainView>
  );
};

export default Buildings;
