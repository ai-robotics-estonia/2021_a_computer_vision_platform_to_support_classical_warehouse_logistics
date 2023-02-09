import React, { useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import RoomImageCard from '../../../../../components/room/RoomImageCard';
import ImageType from '../../../../../types/api/ImageType';
import { IMAGE_TYPE } from '../../../../../utils/classifiers';
import {
  imageToReactGalleryItem,
  toImageFilePath,
} from '../../../../../utils/mappers/imageMappers';
import RoomType from '../../../../../types/api/RoomType';
import RoomImageInfoModal from '../../../../../components/room/RoomImageInfoModal';

interface PropsType {
  room: RoomType;
  images: ImageType[];
  onDelete?(img: ImageType): void;
}

export default function RoomImages({ images, room, onDelete }: PropsType) {
  const gallery = useRef<ImageGallery>(null);
  const [showMore, setShowMore] = useState<ImageType>();

  const roomImages = images.filter(i => i.type === IMAGE_TYPE.CAMERA);
  const imagesSize = Math.sum(...roomImages.map(i => i.fileSize ?? 0));

  const galleryItems: ReactImageGalleryItem[] = roomImages.map(i =>
    imageToReactGalleryItem(i, room.filePath)
  );

  const handleShowImage = (i: ImageType) => {
    if (!gallery.current) return;
    const inx = galleryItems.findIndex(
      gi => gi.original === toImageFilePath(i, room.filePath ?? '')
    );

    gallery.current.slideToIndex(inx);
    // @ts-ignore
    gallery.current.toggleFullScreen();
  };

  return (
    <>
      <Accordion className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {roomImages.length} images
            {!!roomImages.length &&
              ` : ${(imagesSize / 1_000_000).toFixed(1)}MB `}
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              {roomImages.map(i => (
                <Col key={i.id} xs={6} sm={3} md={2} className="mb-2">
                  <RoomImageCard
                    name={i.name}
                    src="/image/thumbnail.png"
                    onMore={() => setShowMore(i)}
                    onView={() => handleShowImage(i)}
                    onDelete={onDelete ? () => onDelete(i) : undefined}
                  />
                </Col>
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {showMore && (
        <RoomImageInfoModal
          onHide={() => setShowMore(undefined)}
          onFullscreen={() => handleShowImage(showMore)}
          onDelete={
            onDelete
              ? () => {
                  onDelete(showMore);
                  setShowMore(undefined);
                }
              : undefined
          }
          image={showMore}
          room={room}
        />
      )}

      <ImageGallery
        ref={gallery}
        items={galleryItems}
        showThumbnails={false}
        showBullets={false}
        showPlayButton={false}
        lazyLoad={true}
      />
    </>
  );
}
