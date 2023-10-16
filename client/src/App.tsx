import React, { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './styles/Loading';
import { GlobalStyle } from './App.styles';
import routes from './routes.jsx';
import ErrorBoundary from './error/ErrorBoundary.js';
import ErrorComponent from './error/Error.js';
import { UserAccount } from './interfaces/user.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getLoggedInUser } from './util/api.js';
// import { useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

const App = () => {
  const [loggedUser, setLoggedUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getLoggedInUser();
      setLoggedUser(user);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ErrorBoundary fallback={<ErrorComponent />}>
        <React.StrictMode>
          <GlobalStyle />
          <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            <RouterProvider router={router} fallbackElement={<Loading />} />
          </UserContext.Provider>
        </React.StrictMode>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

