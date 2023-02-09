import React, { useState } from 'react';
import pc_3 from '../../../assets/pointclouds/pc_3';
import pcc_3 from '../../../assets/pointclouds/pcc_3';
import CameraCollection from '../CameraCollection';
import PointCloudCanvas from '../../PointCloudCanvas';
import PointCloudControls from '../../PointCloudControls';
import './style.scss';

const zoomStep = 2;
const stepM = 20;
const canvasWidth = 800;
const canvasHeight = 800;

const PointCloudMap = () => {
  const [zoom, setZoom] = useState<number>(1);
  const [pointSize, setPointSize] = useState<number>(1);
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);

  const zoomIn = () => {
    setZoom(zoom + zoomStep);
    const stepX = (xOffset * 2) / (zoom + zoomStep);
    const stepY = (yOffset * 2) / (zoom + zoomStep);

    setXOffset(xOffset - stepX);
    setYOffset(yOffset - stepY);
  };
  const zoomOut = () => {
    setZoom(zoom - zoomStep);
    const stepX = (xOffset * 2) / (zoom - zoomStep);
    const stepY = (yOffset * 2) / (zoom - zoomStep);

    setXOffset(xOffset + stepX);
    setYOffset(yOffset + stepY);
  };

  const addPointSize = () => setPointSize(pointSize + 0.5);
  const decPointSize = () => setPointSize(pointSize - 0.5);

  const increaseXOffset = () => setXOffset(xOffset - stepM / zoom);
  const decreaseXOffset = () => setXOffset(xOffset + stepM / zoom);
  const increaseYOffset = () => setYOffset(yOffset - stepM / zoom);
  const decreaseYOffset = () => setYOffset(yOffset + stepM / zoom);

  return (
    <div className="container mt-2 mb-2">
      <PointCloudControls
        zoom={zoom}
        pointSize={pointSize}
        xOffset={xOffset}
        yOffset={yOffset}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onDecreasePointSize={decPointSize}
        onIncreasePointSize={addPointSize}
        onMoveLeft={increaseXOffset}
        onMoveRight={decreaseXOffset}
        onMoveDown={increaseYOffset}
        onMoveUp={decreaseYOffset}
      />
      <PointCloudCanvas
        width={canvasWidth}
        height={canvasHeight}
        pointCloud={pc_3}
        pointCloudColor={pcc_3}
        pointSize={pointSize}
        offsetX={xOffset}
        offsetY={yOffset}
      />
      <CameraCollection />
    </div>
  );
};

export default PointCloudMap;
