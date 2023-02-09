import React from 'react';
import Badge from 'react-bootstrap/Badge';
import CloseButton from 'react-bootstrap/CloseButton';

interface PropTypes {
  name: string;
  onClick?: () => void;
}
const RoomTag = ({ name, onClick = () => {} }: PropTypes) => {
  return (
    <Badge bg="light" text="dark" pill>
      {name}
      <CloseButton onClick={onClick} />
    </Badge>
  );
};

export default RoomTag;
