import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import URLS, { GET_PATH } from '../../../utils/urls';
import LabelValue from '../../../components/LabelValue';
import BuildingType from '../../../types/api/BuildingType';
import RoomType from '../../../types/api/RoomType';
import { NavLink } from 'react-router-dom';

interface PropTypes {
  room: RoomType;
  building?: BuildingType;
  floor?: number;
  isPointCloud?: boolean;
  cameras?: number;

  className?: string;
}

const RoomCard = ({
  room,
  className = '',
  isPointCloud,
  cameras,
  building,
  floor,
}: PropTypes) => {
  const { id, name, description } = room;
  return (
    <Card className={className}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <LabelValue label="Description:" value={description} empty />
            <LabelValue label="Building:" row dep={!!building} empty>
              <NavLink to={GET_PATH.BUILDING_DETAILS(building?.id ?? 0)}>
                {building?.name}
              </NavLink>
            </LabelValue>
            <LabelValue label="Floor:" value={floor} row empty />
          </Col>
          <Col>
            <LabelValue
              label="Point cloud:"
              value={isPointCloud ? 'true' : 'false'}
              row
            />
            <LabelValue label="Cameras:" empty value={cameras ?? 0} row />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal">
          <NavLink className="ms-auto" to={`${URLS.ROOMS}/${id}`}>
            <Button>Map</Button>
          </NavLink>
          <NavLink className="ms-3" to={`${URLS.ROOMS}/${id}`}>
            <Button>Details</Button>
          </NavLink>
          <NavLink className="ms-3" to={`${URLS.ROOMS}/${id}/edit`}>
            <Button>Edit</Button>
          </NavLink>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default RoomCard;
