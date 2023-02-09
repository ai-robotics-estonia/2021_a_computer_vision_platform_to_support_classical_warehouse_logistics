import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GET_PATH } from '../../../../utils/urls';
import MainView from '../../../../components/MainView';
import AppFormGroup from '../../../../components/AppFormGroup';
import RoomType from '../../../../types/api/RoomType';
import useBaseServiceQueries from '../../../../hooks/useBaseServiceQueries';
import BuildingService from '../../../../services/BuildingService';
import useIdParam from '../../../../hooks/useIdParam';
import './style.scss';

const BuildingEdit = () => {
  const id = useIdParam();
  const { useGetQuery } = useBaseServiceQueries(BuildingService);

  const form = useForm<RoomType>({});
  const { handleSubmit, reset } = form;
  const history = useHistory();

  useGetQuery(id ?? 0, {
    onSuccess(building) {
      if (building?.id) reset(building);
    },
  });

  const onSubmit: SubmitHandler<RoomType> = async data => {
    const building = await BuildingService.update(data);
    if (!building) return;
    history.push(GET_PATH.BUILDING_DETAILS(building.id));
  };

  return (
    <MainView>
      <MainView.Header title={`Edit building ${id}`} />
      <MainView.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mb-3">
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

export default BuildingEdit;
