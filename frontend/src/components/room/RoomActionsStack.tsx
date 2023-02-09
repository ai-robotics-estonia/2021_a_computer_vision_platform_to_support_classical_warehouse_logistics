import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from 'react-router-dom';
import { GET_PATH } from '../../utils/urls';

type Props = {
  id: number;
};

export default function RoomActionsStack({ id }: Props) {
  return (
    <Stack direction="horizontal">
      <NavLink className="ms-auto" to={GET_PATH.ROOM_DETAILS(id)}>
        <i title="View on map" className="fa-solid fa-map" />
      </NavLink>
      <NavLink className="ms-3" to={GET_PATH.ROOM_DETAILS(id)}>
        <i title="View details" className="fa-solid fa-eye" />
      </NavLink>
      <NavLink className="ms-3" to={GET_PATH.ROOM_EDIT(id)}>
        <i title="Edit" className="fa-solid fa-pencil" />
      </NavLink>
    </Stack>
  );
}
