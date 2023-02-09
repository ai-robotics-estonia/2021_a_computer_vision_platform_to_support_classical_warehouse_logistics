import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ImageType from '../../types/api/ImageType';
import LabelValue from '../LabelValue';
import { getDefaultRandomDate } from '../../utils/dateUtils';
import ImgCard from '../ImgCard';
import { toImageFilePath } from '../../utils/mappers/imageMappers';
import RoomType from '../../types/api/RoomType';
import ImgCardButton from '../ImgCard/ImgCardButton';

interface PropsType {
  room: RoomType;
  image: ImageType;
  onHide?(): void;
  onDelete?(): void;
  onFullscreen?(): void;
}

export default function RoomImageInfoModal({
  room,
  image,
  onHide,
  onDelete,
  onFullscreen,
}: PropsType) {
  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{image.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImgCard src={toImageFilePath(image, room.filePath)}>
          <ImgCardButton
            icon="fa-solid fa-expand"
            onClick={onFullscreen}
            iconSize={24}
          />
        </ImgCard>
        <LabelValue
          label="File size:"
          value={`${((image.fileSize ?? 0) / 1_000_000).toFixed(2)}MB`}
          row
        />
        <LabelValue label="Resolution:" value={image.resolution} row />
        <LabelValue label="Blurriness:" value={image.blurriness} row />
        <LabelValue
          label="Created at:"
          value={getDefaultRandomDate().toDisplayDateTime()}
          row
        />
        <br />
        {onDelete && (
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
}
