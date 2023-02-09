import React from 'react';
import MatrixInput from '../../../MatrixInput';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

type Props = {
  name: string;
  matrix: number[];
  rotation: number;
  opacity: number;
  ghostOpacity: number;
  onRotation(value: number): void;
  onOpacity(value: number): void;
  onGhostOpacity(value: number): void;
  onMatrix(matrix: number[]): void;
  onHide(): void;
};

export default function CameraControls({
  name,
  matrix,
  opacity,
  rotation,
  ghostOpacity,
  onHide,
  onMatrix,
  onOpacity,
  onRotation,
  onGhostOpacity,
}: Props) {
  const control = useDragAndDrop();
  return (
    <div className="controls" ref={control}>
      <div className="header">
        <span className="title">{name}</span>
        <span className="close" onClick={onHide}>
          X
        </span>
      </div>
      <div className="matrix">
        <MatrixInput matrix={matrix} onChange={value => onMatrix(value)} />
      </div>
      <div>
        <input
          type="number"
          step="1"
          placeholder="rot"
          value={rotation}
          onChange={e => onRotation(Number(e.target.value) ?? 0)}
        />
      </div>
      <div>
        <input
          type="number"
          step="0.1"
          placeholder="OpCam"
          value={opacity}
          onChange={e => onOpacity(Number(e.target.value) ?? 0)}
        />
        <input
          type="number"
          step="0.1"
          placeholder="OpGhost"
          value={ghostOpacity}
          onChange={e => onGhostOpacity(Number(e.target.value) ?? 0)}
        />
      </div>
    </div>
  );
}
