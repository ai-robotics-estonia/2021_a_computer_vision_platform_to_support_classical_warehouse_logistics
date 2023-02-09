import React, { ReactNode } from 'react';
import Card, { CardProps } from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import './style.scss';

interface PropsType extends CardProps {
  className?: string;
  src?: string;
  children?: ReactNode;
  footer?: string;
}

export default function ImgCard({
  src,
  children,
  footer,
  className = '',
  ...props
}: PropsType) {
  return (
    <Card className={`img-card ${className ?? ''}`} {...props}>
      <Card.Img src={src} />
      <div className="img-card-actions">
        <Stack direction="horizontal" gap={1}>
          {children}
        </Stack>
      </div>
      {footer && (
        <span className="img-card-footer" title={footer}>
          {footer}
        </span>
      )}
    </Card>
  );
}
