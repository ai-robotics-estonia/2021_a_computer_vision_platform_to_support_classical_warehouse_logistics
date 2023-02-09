import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import CameraMatrix from '../CameraMatrix';
import './style.scss';

const CameraCollection = () => {
  const [pointer, setPointer] = useState<number[] | undefined>([30, 40]);
  return (
    <Row className="container mt-2 mb-2 camera-collection">
      <div>
        <CameraMatrix
          x={400}
          y={250}
          r={180}
          point={pointer}
          onPoint={setPointer}
          name="Camera1"
        />
        <CameraMatrix
          x={700}
          y={360}
          r={-90}
          point={pointer}
          onPoint={setPointer}
          name="Camera2"
        />
        {pointer && (
          <span className="point" style={{ top: pointer[1], left: pointer[0] }}>
            .
          </span>
        )}
      </div>
    </Row>
  );
};

export default CameraCollection;
