import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';
import AuthService from '../services/AuthService';
import useAxiosStatusInterceptor from '../hooks/useAxiosStatusInterceptor';
import useAxiosErrorDataNullInterceptor from '../hooks/useAxiosErrorDataNullInterceptor';
import useAxiosNetworkErrorInterceptor from '../hooks/useAxiosNetworkErrorInterceptor';

interface PropsType {
  children: JSX.Element;
  loginPage: JSX.Element;
}

export default function LoginController({ children, loginPage }: PropsType) {
  const [login, setLogin] = useState(false);
  const { user, handleUser } = useContext(UserContext);
  useAxiosNetworkErrorInterceptor(() => toast.error('Connection problem'));
  useAxiosStatusInterceptor(401, () => handleUser(undefined));
  useAxiosErrorDataNullInterceptor();

  useEffect(() => {
    if (user) return;
    AuthService.me()
      .then(data => (data ? handleUser(data) : setLogin(true)))
      .catch(() => setLogin(true));
  }, [user]);

  useEffect(() => {
    if (user && login) setLogin(false);
  }, [login, user]);

  if (!user && login) return loginPage;
  if (!user && !login) return <>Loading</>;
  if (login) return null;
  return children;
}
