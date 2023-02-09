import { useQuery, UseQueryOptions } from 'react-query';
import ImageService from '../services/ImageService';
import ImageType from '../types/api/ImageType';
import URLSearchParamsPropType from '../types/URLSearchParamsPropType';

export default function useRoomImageQueries() {
  const useGetQuery = (
    imageId: number,
    useQueryOptions?: UseQueryOptions<ImageType | null>
  ) =>
    useQuery<ImageType | null>(
      ['room-image', imageId],
      () => ImageService.getById(imageId),
      useQueryOptions
    );

  const useSearchQuery = (
    obj: URLSearchParamsPropType,
    useQueryOptions?: UseQueryOptions<ImageType[]>
  ) =>
    useQuery<ImageType[]>(
      ['room-image-search', obj],
      () => ImageService.search(obj),
      useQueryOptions
    );

  return {
    useGetQuery,
    useSearchQuery,
  };
}
