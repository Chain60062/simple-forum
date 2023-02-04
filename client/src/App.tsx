import React, { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './styled/Loading.js';
import routes from './routes.jsx';
// import { UserContextType, UserType } from './types/user';
const queryClient = new QueryClient();
const router = createBrowserRouter(routes);
const url = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8085';

const App = () => {
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    function fetchLoggedInUser() {
      fetch(`${url}/auth/login`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoggedUser(data);
        });
    }
    fetchLoggedInUser();
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{loggedUser, setLoggedUser}}>
          <RouterProvider router={router} fallbackElement={<Loading />} />
          <ReactQueryDevtoolsPanel />
        </UserContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

