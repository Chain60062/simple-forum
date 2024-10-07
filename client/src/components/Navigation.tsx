import { Outlet } from 'react-router-dom'
import TopNav from './TopNav/TopNav'

const Navigation = () => {
	return (
		<>
			<TopNav />
			<Outlet />
		</>
	)
}

export default Navigation
