import React, { ReactNode } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { OverlayChildren } from 'react-bootstrap/Overlay';

interface Props {
  popover: OverlayChildren;
  children: ReactNode;
}

export default function InlinePopTrigger({ popover, children }: Props) {
  return (
    <span style={{ position: 'absolute' }}>
      <OverlayTrigger
        delay={100}
        trigger={['hover', 'focus']}
        placement="right"
        rootClose={true}
        overlay={popover}
      >
        <div
          key="trigger"
          style={{ width: 'fit-content', height: 'fit-content' }}
        >
          {children}
        </div>
      </OverlayTrigger>
    </span>
  );
}
