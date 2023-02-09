import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from 'react-router-dom';
import { GET_PATH } from '../../utils/urls';

type Props = {
  id: number;
};

export default function EventActionsStack({ id }: Props) {
  return (
    <Stack direction="horizontal">
      <NavLink className="ms-3" to={GET_PATH.EVENT_DETAILS(id)}>
        <i className="fa-solid fa-eye" />
      </NavLink>
    </Stack>
  );
}
