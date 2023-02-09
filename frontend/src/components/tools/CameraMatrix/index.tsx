import React, { MouseEventHandler, useEffect, useState } from 'react';
import storage from './storage.jpg';
import {
  matrixArrayToCssMatrix,
  multiplyMatrices,
  rotateZMatrix,
} from '../../../utils/matrices';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import { UnitMatrix } from '../../../utils/constants';
import CameraControls from './components/CameraControls';
import './style.scss';

const toRad = (deg: number) => (deg * Math.PI) / 180;

interface PropTypes {
  x?: number;
  y?: number;
  r?: number;
  dir?: number[];
  name?: string;
  point?: number[];
  onPoint?(point: number[]): void;
}

const getElementXYOnPage = (element?: HTMLElement | null) => {
  if (!element) return [0, 0];
  const X = Math.floor(element.getBoundingClientRect().left + window.scrollX);
  const Y = Math.floor(element.getBoundingClientRect().top + window.scrollY);
  return [X, Y];
};

const CameraMatrix = ({ r, name, point = [0, 0], onPoint }: PropTypes) => {
  const camera = useDragAndDrop();
  const cameraPlain = useDragAndDrop();

  const cameraXY = getElementXYOnPage(camera.current);

  const pointOnCam = [point[0] - cameraXY[0], point[1] - cameraXY[1]];

  const [showControls, setShowControls] = useState(false);

  const [matrix, setMatrix] = useState(UnitMatrix);

  const [rot, setRot] = useState(r ?? 0);
  const [opacity, setOpacity] = useState(0.5);
  const [opacityGhost, setOpacityGhost] = useState(0.1);

  const zoom = 15;
  const origW = 1920;
  const origH = 1080;

  const w = (origW * zoom) / 100;
  const h = (origH * zoom) / 100;

  const inputMatrix = multiplyMatrices(rotateZMatrix(toRad(rot)), matrix);
  const transform = matrixArrayToCssMatrix(inputMatrix);

  const pointOnCamera: MouseEventHandler<HTMLDivElement> = e => {
    // Camera Input
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    //Camera location
    const cam = getElementXYOnPage(camera.current);
    const calcX = cam[0] + x;
    const calcY = cam[1] + y;

    // Todo: Not camera itself, but matrix conversion through plain.

    if (onPoint) onPoint([calcX, calcY]);
  };

  const pointOnPlain: MouseEventHandler<HTMLDivElement> = e => {
    // Todo: Understand how one-to-one point calculates out of camera plane view;
    // Plain Input
    // const x = e.nativeEvent.offsetX;
    // const y = e.nativeEvent.offsetY;

    // Plain location
    // const cam = getElementXYOnPage(cameraPlain.current)
    // const calcX = cam[0] + x;
    // const calcY = cam[1] + y;

    // const inv = multiplyMatrices(inputMatrix, [cam[0], cam[1], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    // Calculated must match with display
    const mustX = e.pageX;
    const mustY = e.pageY;

    if (onPoint) onPoint([mustX, mustY]);
  };

  useEffect(() => {
    if (!cameraPlain.current) return;
    const cameraPlainEl = cameraPlain.current as HTMLDivElement;
    cameraPlainEl.addEventListener('dblclick', () => setShowControls(true));
  }, []);

  return (
    <div className="camera">
      {showControls && (
        <CameraControls
          name={name ?? ''}
          matrix={matrix}
          rotation={rot}
          opacity={opacity}
          ghostOpacity={opacityGhost}
          onRotation={setRot}
          onOpacity={setOpacity}
          onGhostOpacity={setOpacityGhost}
          onMatrix={setMatrix}
          onHide={() => setShowControls(false)}
        />
      )}

      <div
        className="transformable ghost"
        ref={camera}
        style={{ opacity: opacityGhost }}
        onMouseDown={pointOnCamera}
      >
        {pointOnCam && (
          <span
            className="point"
            style={{ top: pointOnCam[1], left: pointOnCam[0] }}
          >
            .
          </span>
        )}
        <span className="title">{name}</span>
        <img src={storage} alt="ghost" width={w} height={h} />
      </div>

      <div className="transformable" ref={cameraPlain}>
        <div style={{ transform, opacity }}>
          {pointOnCam && (
            <span
              className="point"
              style={{ top: pointOnCam[1], left: pointOnCam[0] }}
            >
              .
            </span>
          )}
          <img
            src={storage}
            alt="img"
            onMouseDown={pointOnPlain}
            width={w}
            height={h}
          />
        </div>
      </div>
    </div>
  );
};

// const fieldOfView = toRad(fov);
// const perspective = perspectiveMatrix(fieldOfView, aspectRatio, near, far);
// const perspective1 = perspectiveMatrix2(fieldOfView, aspectRatio, near, far);
// const translate = translateMatrix(x, y, z);
// const rotateX = rotateXMatrix(toRad(rot));
// const rotateY = rotateYMatrix(toRad(rot));
// const scale = scaleMatrix(x, y, z);
// const orto = orthographicMatrix(x, y, z, rot, near, far);

export default CameraMatrix;
