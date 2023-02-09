import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { GET_PATH } from '../../../utils/urls';
import LabelValue from '../../../components/LabelValue';
import BuildingType from '../../../types/api/BuildingType';

interface PropTypes {
  building: BuildingType;
  className?: string;
}

const BuildingCard = ({ className = '', building }: PropTypes) => {
  const { name, description, id } = building;
  return (
    <Card className={className}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <LabelValue label="Description:" value={description} />
        <Row>
          <Col>
            <LabelValue label="Floors:" value="4" row />
            <LabelValue label="Rooms:" value="24" row />
          </Col>
          <Col />
        </Row>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal">
          <Button className="ms-auto" href={GET_PATH.BUILDING_DETAILS(id)}>
            Map
          </Button>
          <Button className="ms-3" href={GET_PATH.BUILDING_DETAILS(id)}>
            Details
          </Button>
          <Button className="ms-3" href={GET_PATH.BUILDING_EDIT(id)}>
            Edit
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default BuildingCard;
