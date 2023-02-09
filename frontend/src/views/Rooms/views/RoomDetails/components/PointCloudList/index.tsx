import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import PointCloudItem from './PointCloudItem';
import PointCloudType from '../../../../../../types/api/PointCloudType';

interface PropsType {
  pointClouds?: PointCloudType[];
  onOpen?(pointCloud: PointCloudType): void;
}

export default function PointCloudList({
  pointClouds = [],
  onOpen = () => {},
}: PropsType) {
  return (
    <Accordion className="mb-3">
      {pointClouds?.map((pc, index) => (
        <Accordion.Item key={pc.id} eventKey={index.toString()}>
          <Accordion.Header>
            Point cloud {pc.createdAt?.toDisplayDateTime()}
          </Accordion.Header>
          <Accordion.Body>
            <PointCloudItem pointCloud={pc} onOpen={() => onOpen(pc)} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
