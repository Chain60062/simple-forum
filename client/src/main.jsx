import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page/ErrorPage';
import Subtopics from './subtopics/Subtopics';
import ProfilePage from './profile-page/ProfilePage';
import LoginPage from './login-page/LoginPage';
import SignupPage from './signup-page/SignupPage';
import Loading from './styles/Loading';
import Navigation from './common/Navigation';
import Topics from './topics/Topics';
import Posts from './posts/Posts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Topics />,
      },
      {
        path: ':topicId/subtopics',
        element: <Subtopics />,
      },
      {
        path: ':subtopic/posts',
        element: <ProfilePage />,
      },
      {
        path: ':user/profile',
        element: <ProfilePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'cadastro',
        element: <SignupPage />,
      },
    ],
  },
  {
    path:':topicId/subtopics/:subtopicId/posts',
    element: <Posts />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </React.StrictMode>
);

// const AppLayout = ({ admin }) =>
//   admin ? (
//     <>
//       <Topbar />
//       <div className='container'>
//         <Sidebar />
//         <Outlet />
//       </div>
//     </>
//   ) : null;

