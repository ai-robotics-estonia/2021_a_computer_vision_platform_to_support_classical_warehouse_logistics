import { getDefaultRandomDate } from '../utils/dateUtils';
import UserType from '../types/api/UserType';

export const USER1: UserType = {
  id: 1,
  email: 'admin@laosysteem.ee',
  isAdmin: true,
  isValidated: true,
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export const USER2: UserType = {
  id: 2,
  email: 'test@laosysteem.ee',
  isAdmin: false,
  isValidated: false,
  createdAt: getDefaultRandomDate().toISOString(),
  updatedAt: getDefaultRandomDate().toISOString(),
};

export default [USER1, USER2];
