import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import MainView from '../../../../components/MainView';
import { GET_PATH } from '../../../../utils/urls';
import { SubmitHandler, useForm } from 'react-hook-form';
import RoomType from '../../../../types/api/RoomType';
import RoomService from '../../../../services/RoomService';
import useIdParam from '../../../../hooks/useIdParam';
import AppFormGroup from '../../../../components/AppFormGroup';
import useBaseServiceQueries from '../../../../hooks/useBaseServiceQueries';
import './style.scss';

const RoomEdit = () => {
  const id = useIdParam();
  const { useGetQuery } = useBaseServiceQueries(RoomService);

  const form = useForm<RoomType>({});
  const { handleSubmit, reset } = form;
  const history = useHistory();

  useGetQuery(id ?? 0, {
    onSuccess(room) {
      if (room?.id) reset(room);
    },
  });

  const onSubmit: SubmitHandler<RoomType> = async data => {
    const room = await RoomService.update(data);
    if (!room) return;
    history.push(GET_PATH.ROOM_DETAILS(room.id));
  };

  return (
    <MainView>
      <MainView.Header title={`Edit room ${id}`} />
      <MainView.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <Card.Body>
              <AppFormGroup name="name" label="Name" isRequired form={form} />
              <AppFormGroup
                name="description"
                label="Description"
                isRequired
                form={form}
              />
            </Card.Body>
            <Card.Footer>
              <Button type="submit">Save Changes</Button>
            </Card.Footer>
          </Card>
        </Form>
      </MainView.Content>
    </MainView>
  );
};

export default RoomEdit;
