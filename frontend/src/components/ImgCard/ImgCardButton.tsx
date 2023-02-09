import React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';

interface Props extends ButtonProps {
  icon?: string;
  iconSize?: number;
}

export default function ImgCardButton({
  icon,
  variant,
  iconSize = 14,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      variant="link"
      className={`img-btn-${variant ?? 'primary'}`}
      style={{ width: iconSize + 10, height: iconSize + 10 }}
    >
      {icon && <i className={icon} />}
    </Button>
  );
}
