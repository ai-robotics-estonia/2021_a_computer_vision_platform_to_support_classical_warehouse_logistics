import React from 'react';
import { ReactImageGalleryItem } from 'react-image-gallery';

type Props = {
  item: ReactImageGalleryItem;
};

export default function Index({ item }: Props) {
  return (
    <video
      src={item.original}
      autoPlay
      style={{ maxWidth: '100vw', maxHeight: '100vh' }}
    />
  );
}
