import React from 'react';
import ReactDOM from 'react-dom/client';
import FrontPage from './front-page/FrontPage';
import ErrorPage from './error-page/ErrorPage';
import Subtopics from './subtopics/Subtopics';
import ProfilePage from './profile-page/ProfilePage';
import LoginPage from './login-page/LoginPage';
import SignupPage from './signup-page/SignupPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:topic/subtopics',
    element: <Subtopics />,
  },
  {
    path: '/:subtopic/posts',
    element: <ProfilePage />,
  },
  {
    path: '/:user/profile',
    element: <ProfilePage />,
  },
  // {
  //   path: '/:user',
  //   element: <UserPosts />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'signup',
    element: <SignupPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
