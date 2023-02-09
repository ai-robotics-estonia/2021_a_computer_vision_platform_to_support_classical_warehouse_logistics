import React from 'react';
import ImgCard from '../ImgCard';
import ImgCardButton from '../ImgCard/ImgCardButton';

type Props = {
  src?: string;
  name?: string;

  onDelete?(): void;
  onView?(): void;
  onMore?(): void;
};

export default function RoomImageCard({
  src,
  name,
  onMore,
  onView,
  onDelete,
}: Props) {
  return (
    <ImgCard src={src} footer={name}>
      {onView && <ImgCardButton icon="fa-solid fa-eye" onClick={onView} />}
      {onDelete && (
        <ImgCardButton icon="fa-solid fa-trash" onClick={onDelete} />
      )}
      {onMore && (
        <ImgCardButton icon="fa-solid fa-ellipsis-vertical" onClick={onMore} />
      )}
    </ImgCard>
  );
}
