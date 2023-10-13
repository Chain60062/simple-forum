import { createContext } from 'react';
import { UserContextType } from '../interfaces/user';

export const UserContext = createContext<UserContextType>({
  loggedUser: null,
  setLoggedUser: () => {},
});

