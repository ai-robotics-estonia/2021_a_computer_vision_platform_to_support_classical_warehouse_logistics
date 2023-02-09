import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

interface Props {
  children: ReactNode;
  onClick?(): void;
  icon?: string;
  to?: string;
}

export default function FullHoverIconButton({
  to,
  children,
  onClick,
  icon,
}: Props) {
  const handleClick = to ? () => history.push(to) : onClick;
  const history = useHistory();
  return (
    <div className="hover-button">
      {children}
      <div
        className="hover-button-background"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === 'Enter') handleClick?.();
        }}
      >
        <i className={icon} />
      </div>
    </div>
  );
}
