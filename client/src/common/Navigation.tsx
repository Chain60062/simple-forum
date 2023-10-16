import TopNav from './TopNav';
import { Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <TopNav />
      <Outlet />
    </>
  );
};

export default Navigation;

