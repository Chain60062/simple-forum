import React, { useState, useContext } from 'react';
import { HiMenu } from 'react-icons/hi';
import { TopNavBody, TopNavIcon, NavLink } from '../styled/TopNav';
import { UserContext } from '../context/UserContext';

const TopNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { loggedUser } = useContext(UserContext);
  return (
    <TopNavBody>
      <NavLink collapsed={isCollapsed} to='/'>
        Home
      </NavLink>

      {loggedUser ? (
        <NavLink collapsed={isCollapsed} css={{ float: 'right' }} to={`/${loggedUser.nickname}`} >
          {loggedUser.profile_name}
        </NavLink>
      ) : (
        <>
          <NavLink
            collapsed={isCollapsed}
            css={{ float: 'right' }}
            to='/cadastro'
          >
            Cadastrar
          </NavLink>

          <NavLink collapsed={isCollapsed} css={{ float: 'right' }} to='/login'>
            Login
          </NavLink>
        </>
      )}

      <TopNavIcon
        as={HiMenu}
        size={28}
        collapsed={isCollapsed}
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      ></TopNavIcon>
    </TopNavBody>
  );
};

export default TopNav;

