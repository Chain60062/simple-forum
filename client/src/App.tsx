import React, { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './styles/Loading';
import { GlobalStyle } from './App.styles';
import routes from './routes.jsx';
import { SERVER_URL } from './util/config';
import './App.css';

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

const App = () => {
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    function fetchLoggedInUser() {
      fetch(`${SERVER_URL}/auth/login`, {
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
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
          <RouterProvider router={router} fallbackElement={<Loading />} />
        </UserContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

