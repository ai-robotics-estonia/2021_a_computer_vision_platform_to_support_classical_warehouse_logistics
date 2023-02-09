import axios from 'axios';
import { useEffect } from 'react';

const useAxiosErrorDataNullInterceptor = () => {
  useEffect(() => {
    const id = axios.interceptors.response.use(
      r => r,
      err => ({ ...err.response, data: null })
    );
    return () => {
      axios.interceptors.response.eject(id);
    };
  }, []);
};

export default useAxiosErrorDataNullInterceptor;
