import React, { useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

type Props = {
  value: number;
  src: string;
  onChange?(value: number): void;
};

export default function VideoFramePicker({ src }: Props) {
  const ref = useRef<HTMLVideoElement>();
  const [_value, setValue] = useState(-1);
  const frameRate = 25;
  const duration = ref.current?.duration ?? 0;

  useEffect(() => {
    if (!ref.current) return;
    ref.current.currentTime = _value / frameRate;
  }, [_value]);

  return (
    <Card>
      <video
        // @ts-ignore
        ref={ref}
        className="card-img"
        src={src}
        onLoadedData={() => setValue(0)}
      />
      <Form.Range
        max={frameRate * duration}
        value={_value}
        onChange={e => setValue(Number(e.target.value))}
      />
      <Row>
        <Col xs={6}>
          <input
            max={Math.floor(frameRate * duration)}
            type="number"
            value={_value}
            onChange={e => setValue(Number(e.target.value))}
            style={{ maxWidth: '100%' }}
          />
        </Col>
        <Col xs={6}>
          <span>/ {Math.floor(frameRate * duration)}</span>
        </Col>
      </Row>
    </Card>
  );
}
