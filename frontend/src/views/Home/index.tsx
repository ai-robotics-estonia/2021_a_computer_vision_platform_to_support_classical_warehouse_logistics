import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainView from '../../components/MainView';
import ValueLabelCard from '../../components/ValueLabelCard';
import FullHoverIconButton from '../../components/FullHoverIconButton';
import URLS from '../../utils/urls';
import useBaseServiceQueries from '../../hooks/useBaseServiceQueries';
import BuildingService from '../../services/BuildingService';
import RoomService from '../../services/RoomService';
import WorkInProgressCard from './components/WorkInProgressCard';
import GlobalCoordinateModal from '../../components/GlobalCoordinateModal';
import EventService from '../../services/EventService';
import './style.scss';

const Home = () => {
  const [showCoordinateModal, setShowCoordinateModal] = useState(false);
  const { useGetAllQuery: useGetAllBuildingsQuery } =
    useBaseServiceQueries(BuildingService);
  const { data: buildings = [] } = useGetAllBuildingsQuery();

  const { useGetAllQuery: useGetAllRoomsQuery } =
    useBaseServiceQueries(RoomService);
  const { data: rooms = [] } = useGetAllRoomsQuery();

  const { useGetAllQuery: useGetAllEventsQuery } =
    useBaseServiceQueries(EventService);
  const { data: events = [] } = useGetAllEventsQuery();

  const colConf = { sm: 6, md: 4, lg: 3 };

  return (
    <MainView>
      <MainView.Header title="Smart Warehouse" />
      <MainView.Content>
        <Row>
          <Col {...colConf} className="mb-3">
            <FullHoverIconButton
              onClick={() => setShowCoordinateModal(true)}
              icon="fa-solid fa-pencil"
            >
              <ValueLabelCard
                label="Relative coordinate"
                value="59.397111612785 24.662278610673 20.5"
              />
            </FullHoverIconButton>
          </Col>
          <Col {...colConf} className="mb-3">
            <FullHoverIconButton to={URLS.BUILDINGS} icon="fa-solid fa-eye">
              <ValueLabelCard label="Buildings" value={buildings.length} />
            </FullHoverIconButton>
          </Col>
          <Col {...colConf} className="mb-3">
            <FullHoverIconButton to={URLS.ROOMS} icon="fa-solid fa-eye">
              <ValueLabelCard label="Rooms" value={rooms.length} />
            </FullHoverIconButton>
          </Col>
          <Col {...colConf} className="mb-3">
            <FullHoverIconButton to={URLS.EVENTS} icon="fa-solid fa-eye">
              <ValueLabelCard label="Events" value={events.length} />
            </FullHoverIconButton>
          </Col>
          <Col {...colConf} className="mb-3">
            <ValueLabelCard label="Point Clouds" value="4" />
          </Col>
          <Col {...colConf} className="mb-3">
            <ValueLabelCard label="Cameras" value="7" />
          </Col>
        </Row>
        <br />

        <Row>
          <Col sm={12} md={6}>
            <WorkInProgressCard
              works={[
                { id: 1, name: 'ITC412', status: 'in Queue(4th)' },
                { id: 2, name: 'Warehouse', status: 'in Progress' },
              ]}
            />
          </Col>
        </Row>
      </MainView.Content>
      {showCoordinateModal && (
        <GlobalCoordinateModal onHide={() => setShowCoordinateModal(false)} />
      )}
    </MainView>
  );
};
export default Home;
