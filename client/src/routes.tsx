import React from 'react';
import ErrorPage from './error/Error';
import Subtopics from './subtopics/Subtopics';
import Profile from './profile/Profile';
import LoginPage from './login/Login';
import SignupPage from './signup/Signup';
import Navigation from './common/Navigation';
import Topics from './topics/Topics';
import Posts from './posts/Posts';
import Replies from './replies/Replies';

const routes = [
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
        element: <Posts />,
      },
      {
        path: ':username',
        element: <Profile />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'cadastro',
        element: <SignupPage />,
      },
      {
        path: ':topicId/subtopics/:subtopicId/posts/:postId',
        element: <Replies />,
      },
    ],
  },
  {
    path: ':topicId/subtopics/:subtopicId/posts',
    element: <Posts />,
  },
];

export default routes;

