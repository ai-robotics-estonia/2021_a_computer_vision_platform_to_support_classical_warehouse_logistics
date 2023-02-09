import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import MainView from '../../../../components/MainView';
import RoomType from '../../../../types/api/RoomType';
import BuildingService from '../../../../services/BuildingService';
import BuildingType from '../../../../types/api/BuildingType';
import AppFormGroup from '../../../../components/AppFormGroup';
import { GET_PATH } from '../../../../utils/urls';
import './style.scss';

const BuildingNew = () => {
  const form = useForm<BuildingType>({});
  const { handleSubmit } = form;
  const history = useHistory();

  const onSubmit: SubmitHandler<RoomType> = async data => {
    const room = await BuildingService.save(data);
    if (!room) return;
    history.push(GET_PATH.ROOM_DETAILS(room.id));
  };

  return (
    <MainView>
      <MainView.Header title="Add a new building" />
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
                Add Building
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      </MainView.Content>
    </MainView>
  );
};

export default BuildingNew;
