import PointcloudCoordinate from '../types/PointcloudCoordinate';
import { RenderingContext2D } from 'canvg';

export const drawCoordinate = (
  ctx: RenderingContext2D,
  x: number,
  y: number,
  r: string,
  g: string,
  b: string,
  pointSize: number
) => {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.beginPath();
  ctx.fillRect(x, y, pointSize, pointSize);
  ctx.fill();
};

export const renderPointcloud = (
  canvas: HTMLCanvasElement,
  coordinates: PointcloudCoordinate[],
  xOffset: number,
  yOffset: number,
  zoom: number,
  pointSize: number
) => {
  // let glContextAttributes = { preserveDrawingBuffer: true };
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  for (let i = 0; i < coordinates.length; i++) {
    drawCoordinate(
      ctx,
      (xOffset + coordinates[i].x) * zoom,
      (yOffset + coordinates[i].y) * zoom,
      coordinates[i].r,
      coordinates[i].g,
      coordinates[i].b,
      pointSize
    );
  }
};

export default {};
