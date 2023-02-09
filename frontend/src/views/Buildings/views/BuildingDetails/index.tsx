import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MainView from '../../../../components/MainView';
import URLS, { GET_PATH } from '../../../../utils/urls';
import useIdParam from '../../../../hooks/useIdParam';
import useBaseServiceQueries from '../../../../hooks/useBaseServiceQueries';
import BuildingType from '../../../../types/api/BuildingType';
import BuildingService from '../../../../services/BuildingService';
import BuildingFloors from '../../../Rooms/views/RoomDetails/components/BuildingFloors';
import BuildingRoomService from '../../../../services/BuildingRoomService';
import BuildingRoomType from '../../../../types/api/BuildingRoomType';
import RoomService from '../../../../services/RoomService';
import RoomType from '../../../../types/api/RoomType';
import LabelValue from '../../../../components/LabelValue';
import AddRoomBtn from '../../../../components/building/AddRoomBtn';
import { whereIsUnique } from '../../../../utils/filters/arrayFilters';
import './style.scss';

const BuildingDetails = () => {
  const id = useIdParam();
  const history = useHistory();
  const { useDeleteMutation, useGetQuery } =
    useBaseServiceQueries<BuildingType>(BuildingService);
  const { useGetAllQuery: useGetAllBuildingRoomsQuery } =
    useBaseServiceQueries<BuildingRoomType>(BuildingRoomService);
  const { useGetAllQuery: useGetAllRoomsQuery } =
    useBaseServiceQueries<RoomType>(RoomService);

  const { data: building } = useGetQuery(id ?? 0);
  const { mutate: handleDelete } = useDeleteMutation(building?.id ?? 0, {
    onSuccess() {
      history.push(URLS.BUILDINGS);
    },
  });
  const { data: rooms = [] } = useGetAllRoomsQuery();
  const { data: allBuildingRooms = [], refetch } =
    useGetAllBuildingRoomsQuery();
  const buildingRooms = allBuildingRooms.filter(br => br.buildingId === id);

  const handleRoomAdd = async (bRoom: BuildingRoomType) => {
    if (!id) return;
    bRoom.buildingId = id;
    const br = await BuildingRoomService.save(bRoom);
    if (br?.id) refetch();
  };
  const { name, description, createdAt, updatedAt } = building ?? {};

  return (
    <MainView>
      <MainView.Header title="Building Details" />
      <MainView.Content>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col>
                <h2>{name}</h2>
              </Col>
              <Col>
                <NavLink
                  className="float-end"
                  to={GET_PATH.BUILDING_EDIT(id ?? 0)}
                >
                  <Button variant="link">Edit</Button>
                </NavLink>
              </Col>
            </Row>

            <LabelValue label="Description:" value={description} />

            <Row>
              <Col sm={12} md={6}>
                <LabelValue label="Is any point cloud:" value="true" row />
                <LabelValue label="Is all point cloud:" value="false" row />
                <LabelValue label="Area:" row>
                  152m<sup>2</sup>
                </LabelValue>
                <LabelValue
                  label="Floors:"
                  value={
                    buildingRooms.map(br => br.floor).filter(whereIsUnique)
                      .length
                  }
                  row
                />
              </Col>
              <Col>
                <LabelValue
                  label="Created at:"
                  value={createdAt?.toDisplayDateTime()}
                  row
                />
                <LabelValue
                  label="Updated at:"
                  value={updatedAt?.toDisplayDateTime()}
                  row
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <BuildingFloors
          className="mb-3"
          buildingRooms={buildingRooms}
          rooms={rooms}
          onRoomAdd={handleRoomAdd}
        />

        <div className="mb-3">
          <AddRoomBtn onSubmit={handleRoomAdd}>Add Room to building</AddRoomBtn>
        </div>

        <Button variant="danger" onClick={() => handleDelete()}>
          Delete Building
        </Button>
      </MainView.Content>
    </MainView>
  );
};

export default BuildingDetails;
