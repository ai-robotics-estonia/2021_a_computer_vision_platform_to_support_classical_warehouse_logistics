import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import ErrorType from '../types/api/ErrorType';

const useAxiosStatusInterceptor = (
  status: number,
  cb: (err: AxiosError<ErrorType>) => void
) => {
  useEffect(() => {
    const id = axios.interceptors.response.use(
      res => res,
      (err: AxiosError<ErrorType>) => {
        if (err.response?.status === status) cb(err);
        throw err;
      }
    );
    return () => {
      axios.interceptors.response.eject(id);
    };
  }, []);
};

export default useAxiosStatusInterceptor;
