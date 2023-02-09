import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Props = {
  zoom: number;
  pointSize: number;
  xOffset: number;
  yOffset: number;

  onZoomIn?(): void;
  onZoomOut?(): void;
  onDecreasePointSize?(): void;
  onIncreasePointSize?(): void;
  onMoveLeft?(): void;
  onMoveRight?(): void;
  onMoveUp?(): void;
  onMoveDown?(): void;
};

export default function PointCloudControls({
  zoom,
  pointSize,
  xOffset,
  yOffset,
  onIncreasePointSize,
  onDecreasePointSize,
  onZoomIn,
  onZoomOut,
  onMoveLeft,
  onMoveDown,
  onMoveUp,
  onMoveRight,
}: Props) {
  return (
    <Row className="controls-container">
      <Col>
        Zoom
        <i className="fa-solid fa-magnifying-glass-plus" onClick={onZoomIn} />
        <i className="fa-solid fa-magnifying-glass-minus" onClick={onZoomOut} />
        {zoom}
      </Col>
      <Col>
        Point size
        <i
          className="fa-regular fa-circle-arrow-down"
          onClick={onDecreasePointSize}
        />
        <i
          className="fa-regular fa-circle-arrow-up"
          onClick={onIncreasePointSize}
        />
        {pointSize}
      </Col>
      <Col>
        <i className="fa-regular fa-circle-arrow-left" onClick={onMoveLeft} />
        <i className="fa-regular fa-circle-arrow-up" onClick={onMoveUp} />
        <i className="fa-regular fa-circle-arrow-down" onClick={onMoveDown} />
        <i className="fa-regular fa-circle-arrow-right" onClick={onMoveRight} />
        {xOffset} : {yOffset}
      </Col>
      <hr />
    </Row>
  );
}
