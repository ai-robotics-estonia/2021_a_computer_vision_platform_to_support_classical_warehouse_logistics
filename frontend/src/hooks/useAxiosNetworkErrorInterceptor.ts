import { AxiosError } from 'axios';
import ErrorType from '../types/api/ErrorType';
import useAxiosStatusInterceptor from './useAxiosStatusInterceptor';

const useAxiosNetworkErrorInterceptor = (
  cb: (err: AxiosError<ErrorType>) => void
) => {
  useAxiosStatusInterceptor(0, cb);
};

export default useAxiosNetworkErrorInterceptor;
