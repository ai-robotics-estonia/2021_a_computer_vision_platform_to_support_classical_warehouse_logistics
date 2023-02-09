import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import pc_3 from '../../../assets/pointclouds/pc_3';
import pcc_3 from '../../../assets/pointclouds/pcc_3';
import PointCloudCanvas from '../../PointCloudCanvas';
import {
  EVENT_RAW_RESULT1,
  EVENT_RAW_RESULT2,
  EVENT_RAW_RESULT3,
} from '../../../mock/EventResultMock';
import VideoFramePicker from '../../VideoFramePicker';
import RawEventLine from './components/RawEventLine';
import './style.scss';

const canvasWidth = 800;
const canvasHeight = 800;

const Event = () => {
  const [ev1, setEv1] = useState(true);
  const [ev2, setEv2] = useState(true);
  const [ev3, setEv3] = useState(true);
  const [activeAt, setActiveAt] = useState(-1);

  return (
    <div className="mt-2 mb-2">
      <Row className="m-0">
        <Col xs={2} style={{ borderRight: 'solid #000000' }}>
          <div className="position-relative">
            <VideoFramePicker value={0} src="/video/events/1.mp4" />
            <Form.Check
              type="checkbox"
              id="e1"
              className="camera-visibility"
              checked={ev1}
              onChange={e => setEv1(!!e.target?.checked)}
            />
          </div>
          <div className="position-relative">
            <VideoFramePicker value={0} src="/video/events/2.mp4" />
            <Form.Check
              type="checkbox"
              id="e2"
              className="camera-visibility"
              checked={ev2}
              onChange={e => setEv2(!!e.target?.checked)}
            />
          </div>
          <div className="position-relative">
            <VideoFramePicker value={0} src="/video/events/3.mp4" />
            <Form.Check
              type="checkbox"
              id="e3"
              className="camera-visibility"
              checked={ev3}
              onChange={e => setEv3(!!e.target?.checked)}
            />
          </div>
        </Col>
        <Col>
          <Form.Range
            max={EVENT_RAW_RESULT1.length - 1}
            onChange={e => {
              setActiveAt(Number(e.target?.value ?? ''));
            }}
          />
          <div className="position-relative">
            <svg id="eventLines" overflow="visible">
              {ev1 && (
                <RawEventLine
                  activeAt={activeAt}
                  eventLines={EVENT_RAW_RESULT1}
                  color="green"
                />
              )}
              {ev2 && (
                <RawEventLine
                  activeAt={activeAt}
                  eventLines={EVENT_RAW_RESULT2}
                  color="yellow"
                />
              )}
              {ev3 && (
                <RawEventLine
                  activeAt={activeAt}
                  eventLines={EVENT_RAW_RESULT3}
                  color="blue"
                />
              )}
            </svg>
          </div>
          <PointCloudCanvas
            width={canvasWidth}
            height={canvasHeight}
            pointCloud={pc_3}
            pointCloudColor={pcc_3}
          />
          {/*<CameraCollection />*/}
        </Col>
      </Row>
    </div>
  );
};

export default Event;
