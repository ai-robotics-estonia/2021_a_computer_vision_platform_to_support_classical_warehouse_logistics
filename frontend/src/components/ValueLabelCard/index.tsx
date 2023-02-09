import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';
import './style.scss';

interface PropsType {
  title?: ReactNode;
  description?: ReactNode;
  value?: ReactNode;
  label?: ReactNode;
}

export default function ValueLabelCard({
  title,
  value,
  label,
  description,
}: PropsType) {
  return (
    <Card className="value-label-card">
      {title && (
        <div className="title-section">
          {title && (
            <p
              style={description ? { marginBottom: '0' } : {}}
              className="title"
            >
              {title}
            </p>
          )}
          {description && <p className="description">{description}</p>}
        </div>
      )}
      {!!value?.toString() && <p className="value">{value}</p>}
      {!!label?.toString() && <p className="label">{label}</p>}
    </Card>
  );
}
