import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GET_PATH } from '../../../../utils/urls';
import MainView from '../../../../components/MainView';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AppFormGroup from '../../../../components/AppFormGroup';
import EventType from '../../../../types/api/EventType';
import EventService from '../../../../services/EventService';
import useBaseServiceQueries from '../../../../hooks/useBaseServiceQueries';
import RoomType from '../../../../types/api/RoomType';
import RoomService from '../../../../services/RoomService';
import { EventVideoControl } from '../../components/EventVideoControl';
import PointCloudMock from '../../../../mock/PointCloudMock';

export default function EventNew() {
  const form = useForm<EventType>({});
  const { handleSubmit, watch } = form;
  // @ts-ignore
  const roomId = watch('roomId');
  const history = useHistory();

  const { useGetAllQuery } = useBaseServiceQueries<RoomType>(RoomService);
  const { data: rooms = [] } = useGetAllQuery();

  const onSubmit: SubmitHandler<EventType> = async data => {
    const event = await EventService.save(data);
    if (!event) return;
    history.push(GET_PATH.EVENT_DETAILS(event.id));
  };

  return (
    <MainView>
      <MainView.Header title="Add a new event" />

      <MainView.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <Card.Body>
              <AppFormGroup name="name" label="Name" isRequired form={form} />
              <AppFormGroup
                name="description"
                label="Description"
                as="textarea"
                isRequired
                form={form}
              />
              <AppFormGroup.Select
                options={rooms}
                getKey={r => r.id}
                getLabel={r => r.name}
                name="roomId"
                label="Room"
                form={form}
                isRequired
              />

              {roomId && (
                <AppFormGroup.Select
                  options={PointCloudMock}
                  getKey={r => r.id}
                  getLabel={r => r.createdAt?.toDisplayDateTime()}
                  name="pointCloudId"
                  label="Point cloud"
                  form={form}
                  isRequired
                />
              )}

              {roomId && (
                <Row className="mt-3">
                  <Col>
                    <EventVideoControl />
                  </Col>
                  <Col>
                    <EventVideoControl video="/video/events/2.mp4" />
                  </Col>
                  <Col>
                    <EventVideoControl video="/video/events/3.mp4" />
                  </Col>
                </Row>
              )}
              {roomId && (
                <Row>
                  <Col sm={8} md={6} lg={4} xl={3}>
                    <AppFormGroup
                      name="frameStep"
                      label="Frame step"
                      type="number"
                      asNumber
                      isRequired
                      form={form}
                    />
                  </Col>
                </Row>
              )}
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" type="submit">
                Run event
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      </MainView.Content>
    </MainView>
  );
}
