import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CameraImageCard from '../../../../../components/room/CameraImageCard';
import ImageType from '../../../../../types/api/ImageType';
import RoomType from '../../../../../types/api/RoomType';
import { toImageFilePath } from '../../../../../utils/mappers/imageMappers';
import { IMAGE_TYPE } from '../../../../../utils/classifiers';
import ImageMask from '../../../../../components/ImageMask';
import CameraImageInfoModal from '../../../../../components/room/CameraImageInfoModal';

interface PropsType {
  room: RoomType;
  images: ImageType[];
  onMask?(file: File): Promise<boolean> | boolean;
  onDelete?(img: ImageType): void;
}

export default function CameraImages({
  room,
  images,
  onDelete,
  onMask = () => false,
}: PropsType) {
  const [showMore, setShowMore] = useState<ImageType>();
  const [mask, setMask] = useState<string>();
  const cameraImages = images.filter(i => i.type === IMAGE_TYPE.CCTV);

  return (
    <>
      <Accordion className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{cameraImages.length} cameras</Accordion.Header>
          <Accordion.Body>
            <Row>
              {cameraImages.map(i => (
                <Col key={i.id} xs={12} sm={6} md={4} xl={3}>
                  <CameraImageCard
                    isMasked={!!images.find(im => im.name === i.name + '.png')}
                    src={toImageFilePath(i, room?.filePath ?? '')}
                    name={i.name}
                    onDelete={onDelete ? () => onDelete(i) : undefined}
                    onMore={() => setShowMore(i)}
                    onMask={() =>
                      setMask(toImageFilePath(i, room?.filePath ?? ''))
                    }
                  />
                </Col>
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {!mask && showMore && (
        <CameraImageInfoModal
          room={room}
          maskImage={images.find(im => im.name === showMore.name + '.png')}
          onHide={() => setShowMore(undefined)}
          image={showMore}
          onDelete={
            onDelete
              ? () => {
                  onDelete(showMore);
                  setShowMore(undefined);
                }
              : undefined
          }
          onMaskDelete={
            onDelete
              ? () => {
                  const maskImage = images.find(
                    im => im.name === showMore.name + '.png'
                  );
                  if (!maskImage) return;
                  onDelete(maskImage);
                }
              : undefined
          }
          onMask={() =>
            setMask(toImageFilePath(showMore, room?.filePath ?? ''))
          }
        />
      )}

      {mask && (
        <ImageMask
          src={mask}
          onClose={() => setMask(undefined)}
          onSave={onMask}
        />
      )}
    </>
  );
}
