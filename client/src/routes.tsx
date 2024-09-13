import { userExists } from './api/users'
import Navigation from './components/Navigation'
import ErrorPage from './pages/error/NotFound'
import LoginPage from './pages/login/Login'
import Posts from './pages/posts/Posts'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import Replies from './pages/replies/Replies'
import Subtopics from './pages/subtopics/Subtopics'
import Topics from './pages/topics/Topics'

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
				loader: userExists, //checar se perfil de usuario existe
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'cadastro',
				element: <Register />,
			},
			{
				path: 'logout',
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
]

export default routes
