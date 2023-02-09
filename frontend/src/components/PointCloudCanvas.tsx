import React, { useEffect, useRef, useState } from 'react';
import PointcloudCoordinate from '../types/PointcloudCoordinate';
import { pointcloudStringParser } from '../utils/mappers/pointcloudMapper';
import { renderPointcloud } from '../utils/canvasUtils';

type Props = {
  width: 800;
  height: 800;
  pointCloud: string;
  pointCloudColor: string;
  pointSize?: number;
  offsetX?: number;
  offsetY?: number;

  onSetZoom?(amount: number): void;
};

export default function PointCloudCanvas({
  width,
  height,
  pointCloud,
  pointCloudColor,
  pointSize = 1,
  offsetY = 0,
  offsetX = 0,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [coordinates, setCoordinates] = useState<PointcloudCoordinate[]>([]);
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);

  const getCoordinates = () => {
    const result = pointcloudStringParser(pointCloud, pointCloudColor);
    const { coordinates, yMin, xMin, yD, xD } = result;

    setXOffset(-xMin);
    setYOffset(-yMin);

    const xMult = width / xD;
    const yMult = height / yD;
    const mult = Math.min(xMult, yMult);

    if (xMult < yMult) {
      const pch = yD / 2 + yMin;
      setYOffset(height / 2 / mult - pch);
    }
    if (xMult > yMult) {
      const pcw = xD / 2 + xMin;
      setXOffset(width / 2 / mult - pcw);
    }

    setZoom(mult);
    setCoordinates(coordinates);
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    clearCanvas(ref.current);
    renderPointcloud(
      ref.current,
      coordinates,
      xOffset + offsetX,
      yOffset + offsetY,
      zoom,
      pointSize
    );
  }, [zoom, coordinates, pointSize, xOffset, yOffset, offsetX, offsetY]);

  const clearCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <canvas
      className="map-container"
      id="canvas"
      width={width}
      height={height}
      ref={ref}
    />
  );
}
