import { useLocation, useHistory } from 'react-router-dom';

export const DEFAULT_RELOAD_URL = '/reload';

interface UseRefreshType {
  path?: string;
  resetRoute?: string;
}

export default function useRefresh(props?: UseRefreshType) {
  const history = useHistory();
  const location = useLocation();

  const resetRoute = props?.resetRoute ?? DEFAULT_RELOAD_URL;
  const path = props?.path ?? location;

  return () => {
    history.push(resetRoute);
    setTimeout(() => {
      history.push(path);
    });
  };
}
