import React from 'react';
import ImgCard from '../ImgCard';
import ImgCardButton from '../ImgCard/ImgCardButton';

type Props = {
  src?: string;
  isMasked?: boolean;
  name?: string;

  onDelete?(): void;
  onMore?(): void;
  onMask?(): void;
};

export default function CameraImageCard({
  src,
  name,
  isMasked,
  onMask,
  onMore,
  onDelete,
}: Props) {
  return (
    <ImgCard src={src} footer={name}>
      {!isMasked && onMask && (
        <ImgCardButton
          iconSize={20}
          icon="fa-regular fa-mask"
          onClick={onMask}
        />
      )}
      {onDelete && (
        <ImgCardButton
          iconSize={20}
          icon="fa-solid fa-trash"
          onClick={onDelete}
        />
      )}
      {onMore && (
        <ImgCardButton
          iconSize={20}
          icon="fa-solid fa-ellipsis-vertical"
          onClick={onMore}
        />
      )}
    </ImgCard>
  );
}
