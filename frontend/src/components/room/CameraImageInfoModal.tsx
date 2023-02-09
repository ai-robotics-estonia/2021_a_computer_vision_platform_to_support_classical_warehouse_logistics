import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ImageType from '../../types/api/ImageType';
import LabelValue from '../LabelValue';
import { getDefaultRandomDate } from '../../utils/dateUtils';
import ImgCard from '../ImgCard';
import { toImageFilePath } from '../../utils/mappers/imageMappers';
import RoomType from '../../types/api/RoomType';

interface MaskingInfoProps {
  maskImage?: ImageType;
  onMaskDelete?(): void;
  onMask?(): void;
}

interface PropsType extends MaskingInfoProps {
  room: RoomType;
  image: ImageType;
  onHide?(): void;
  onDelete?(): void;
}

const MaskingInfo = ({ maskImage, onMask, onMaskDelete }: MaskingInfoProps) => {
  return (
    <>
      <h5>Masking info</h5>
      <LabelValue label="Quit" value="Esc" row />
      <LabelValue label="Draw" value="Left Mouse Button" row />
      <LabelValue label="Erase" value="Right Mouse Button" row />
      <LabelValue label="Save" value="S" row />
      <LabelValue label="Test" value="T" row />
      <br />
      <Stack direction="horizontal">
        {!maskImage && onMask && (
          <Button className="ms-auto" onClick={onMask}>
            Create mask
          </Button>
        )}
        {maskImage && onMaskDelete && (
          <Button className="ms-auto" variant="danger" onClick={onMaskDelete}>
            Remove mask
          </Button>
        )}
      </Stack>
    </>
  );
};

export default function CameraImageInfoModal({
  room,
  image,
  maskImage,
  onHide,
  onMask,
  onDelete,
  onMaskDelete,
}: PropsType) {
  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{image.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="position-relative">
          <ImgCard
            className={maskImage ? 'position-absolute' : ''}
            src={toImageFilePath(image, room.filePath)}
          />
          {maskImage && (
            <ImgCard
              style={{ opacity: 0.2 }}
              src={toImageFilePath(maskImage, room.filePath)}
            />
          )}
        </div>

        <LabelValue label="File size:" value="1.3MB" row />
        <LabelValue label="Resolution:" value="1020x720" row />
        <LabelValue
          label="Created at:"
          value={getDefaultRandomDate().toDisplayDateTime()}
          row
        />
        <br />
        <Stack direction="horizontal">
          {onDelete && (
            <Button className="ms-auto" variant="danger" onClick={onDelete}>
              Delete
            </Button>
          )}
        </Stack>
        {onMaskDelete && <hr />}
        {onMaskDelete && (
          <MaskingInfo
            onMask={onMask}
            onMaskDelete={onMaskDelete}
            maskImage={maskImage}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}
