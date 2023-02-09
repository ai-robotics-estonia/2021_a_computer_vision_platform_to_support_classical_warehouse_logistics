import IBaseService from '../services/interfaces/IBaseService';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';

export default function useBaseServiceQueries<T>(baseService: IBaseService<T>) {
  const useDeleteMutation = (
    id: number,
    useMutationOptions?: UseMutationOptions<boolean, number>
  ) =>
    useMutation<boolean, number>(
      ['queries-delete', baseService],
      () => baseService.delete(id),
      useMutationOptions
    );

  const usePatchMutation = (
    objs: T,
    useMutationOptions?: UseMutationOptions<T | null>
  ) =>
    useMutation<T | null>(
      ['queries-patch', baseService],
      () => baseService.patch(objs),
      useMutationOptions
    );

  const useUpdateManyMutation = (
    objs: T[],
    useMutationOptions?: UseMutationOptions<T[]>
  ) =>
    useMutation<T[]>(
      ['queries-update-many', baseService],
      () => baseService.updateMany(objs),
      useMutationOptions
    );

  const useUpdateMutation = (
    useMutationOptions?: UseMutationOptions<T | null, Error, T>
  ) =>
    useMutation<T | null, Error, T>(
      ['queries-update', baseService],
      obj => baseService.update(obj),
      useMutationOptions
    );
  const useSaveMutation = (
    obj: T,
    useMutationOptions?: UseMutationOptions<T | null>
  ) =>
    useMutation<T | null>(
      ['queries-save', baseService],
      () => baseService.save(obj),
      useMutationOptions
    );

  const useGetQuery = (
    id: number,
    useQueryOptions?: UseQueryOptions<T | null>
  ) =>
    useQuery<T | null>(
      ['queries-get', baseService, id],
      () => baseService.getById(id),
      useQueryOptions
    );

  const useGetAllQuery = (useQueryOptions?: UseQueryOptions<T[]>) =>
    useQuery<T[]>(
      ['queries-get-all', baseService],
      () => baseService.getAll(),
      useQueryOptions
    );

  return {
    useDeleteMutation,
    useSaveMutation,
    usePatchMutation,
    useUpdateManyMutation,
    useUpdateMutation,
    useGetAllQuery,
    useGetQuery,
  };
}
