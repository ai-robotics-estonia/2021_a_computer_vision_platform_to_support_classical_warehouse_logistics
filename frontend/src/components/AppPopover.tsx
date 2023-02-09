import React, { ReactNode } from 'react';
import Popover from 'react-bootstrap/Popover';

const getRandomKey = (): string =>
  'pop' + Math.floor(Math.random() * 10000).toString();

export default function AppPopover(children: ReactNode) {
  return (
    <Popover id={getRandomKey()}>
      <Popover.Body>{children}</Popover.Body>
    </Popover>
  );
}
