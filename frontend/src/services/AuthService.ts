import axios from 'axios';
import UserType from '../types/api/UserType';
import BaseService from './base/BaseService';
import CONTROLLER from '../utils/controllers';
import LoginForm from '../types/form/LoginForm';

const AuthUser = new BaseService<UserType>(CONTROLLER.AUTH_USER);

export default {
  me: AuthUser.get,
  login: async (loginForm: LoginForm): Promise<UserType | null> => {
    const res = await axios.post<UserType>(CONTROLLER.AUTH_LOGIN, loginForm);
    return res.data;
  },
  register: async (loginForm: LoginForm): Promise<UserType | null> => {
    const res = await axios.post<UserType>(CONTROLLER.AUTH_REGISTER, loginForm);
    return res.data;
  },
  logout: async (): Promise<boolean> => {
    const res = await axios.post(CONTROLLER.AUTH_LOGOUT, {});
    return res.status === 200;
  },
};
