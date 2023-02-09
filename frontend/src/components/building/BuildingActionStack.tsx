import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from 'react-router-dom';
import { GET_PATH } from '../../utils/urls';

type Props = {
  id: number;
};

export default function BuildingActionsStack({ id }: Props) {
  return (
    <Stack direction="horizontal">
      <NavLink className="ms-auto" to={GET_PATH.BUILDING_DETAILS(id)}>
        <i title="View on map" className="fa-solid fa-map" />
      </NavLink>
      <NavLink className="ms-3" to={GET_PATH.BUILDING_DETAILS(id)}>
        <i title="View details" className="fa-solid fa-eye" />
      </NavLink>
      <NavLink className="ms-3" to={GET_PATH.BUILDING_EDIT(id)}>
        <i title="Edit" className="fa-solid fa-pencil" />
      </NavLink>
    </Stack>
  );
}
