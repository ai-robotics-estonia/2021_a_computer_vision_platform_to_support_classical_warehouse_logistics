import React, { createContext, ReactNode, useState } from 'react';
import UserType from '../types/api/UserType';

interface PropTypes {
  children: ReactNode;
}

interface ContextProps {
  user?: UserType;
  handleUser(user?: UserType): void;
}

export const UserContext = createContext<ContextProps>({} as ContextProps);

const UserContextProvider = ({ children }: PropTypes) => {
  const [user, setUser] = useState<UserType>();

  const value = {
    user,
    handleUser(user?: UserType) {
      setUser(user);
    },
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
