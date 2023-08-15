import React, { useState, useContext } from 'react';
import { HiMenu } from 'react-icons/hi';
import { TopNavBody, TopNavIcon, NavLink } from '../styles/TopNav';
import { UserContext } from '../context/UserContext';

const TopNav = () => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const { loggedUser } = useContext(UserContext);
  return (
    <TopNavBody>
      <NavLink to='/'>Home</NavLink>

      {loggedUser ? (
        <NavLink style={{ float: 'right' }} to={`/${loggedUser.nickname}`}>
          {loggedUser.profile_name}
        </NavLink>
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

