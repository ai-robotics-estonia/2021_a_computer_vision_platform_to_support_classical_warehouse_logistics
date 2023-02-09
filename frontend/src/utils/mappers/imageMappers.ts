import { ReactImageGalleryItem } from 'react-image-gallery';
import ImageType from '../../types/api/ImageType';
import STATIC_FILES from '../staticFiles';

// /api/v1/s_generated/bf22ca62-385e-4ec9-b0cb-b7442045da47/potree/metadata.json
export const toImageFilePath = (img: ImageType, roomFiles?: string) =>
  `${STATIC_FILES.IMAGES}/${roomFiles ?? ''}/${img.type}/${img.name}`;

export const imageToReactGalleryItem = (
  img: ImageType,
  roomFiles?: string
): ReactImageGalleryItem => ({
  original: toImageFilePath(img, roomFiles),
  description: img.name,
});
