import { useContext } from 'react';
import { HiMenu } from 'react-icons/hi';
import { TopNavBody, TopNavIcon, NavLink, LogoutNavLink } from '../styles/TopNav';
import { UserContext } from '../context/UserContext';
import { logout } from '../api/auth';

const TopNav = () => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const signOut = async () => {
    logout();
    setLoggedUser(null);
  };

  return (
    <TopNavBody>
      <NavLink to='/'>Home</NavLink>

      {loggedUser ? (
        <>
          <NavLink
            style={{ float: 'right' }}
            to={`/${loggedUser.profile_name}`}
          >
            {loggedUser.user_name}
          </NavLink>

          <LogoutNavLink style={{ float: 'right' }} onClick={() => signOut()}>
            Logout
          </LogoutNavLink>
        </>
      ) : (
        <>
          <NavLink style={{ float: 'right' }} to='/cadastro'>
            Cadastrar
          </NavLink>

          <NavLink style={{ float: 'right' }} to='/login'>
            Login
          </NavLink>
        </>
      )}

      <TopNavIcon as={HiMenu} size={28}></TopNavIcon>
    </TopNavBody>
  );
};

export default TopNav;

