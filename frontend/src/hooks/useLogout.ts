import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import AuthService from '../services/AuthService';

export default function useLogout() {
  const { handleUser } = useContext(UserContext);
  return async () => {
    await AuthService.logout();
    handleUser();
  };
}
