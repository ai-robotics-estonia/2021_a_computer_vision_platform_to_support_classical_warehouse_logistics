import React, { ReactNode } from 'react';
import { OverlayChildren } from 'react-bootstrap/Overlay';
import InlinePopTrigger from './InlinePopTrigger';
import AppPopover from './AppPopover';

interface Props {
  text?: string;
  popover?: OverlayChildren;
  children?: ReactNode;
}

export default function ReadMore({ text, popover, children }: Props) {
  if (!text && !popover) text = '';
  return (
    <InlinePopTrigger popover={popover || AppPopover(text)}>
      {!children && <i className="fa-regular fa-triangle-exclamation" />}
      {children}
    </InlinePopTrigger>
  );
}
