import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import MainView from '../../../../components/MainView';
import RoomType from '../../../../types/api/RoomType';
import AppFormGroup from '../../../../components/AppFormGroup';
import RoomService from '../../../../services/RoomService';
import { GET_PATH } from '../../../../utils/urls';
import './style.scss';

const RoomNew = () => {
  const form = useForm<RoomType>({});
  const { handleSubmit } = form;
  const history = useHistory();

  const onSubmit: SubmitHandler<RoomType> = async data => {
    const room = await RoomService.save(data);
    if (!room) return;
    history.push(GET_PATH.ROOM_DETAILS(room.id));
  };

  return (
    <MainView>
      <MainView.Header title="Add a new room" />

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
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" type="submit">
                Add Room
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      </MainView.Content>
    </MainView>
  );
};

export default RoomNew;
