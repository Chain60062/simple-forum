import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { TopNavBody, TopNavIcon, NavLink } from '../styles/TopNav';

const TopNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <nav>
      <TopNavBody>
        <NavLink collapsed={isCollapsed} to='/'>Home</NavLink>
        <NavLink collapsed={isCollapsed}>Sneed</NavLink>
        <NavLink collapsed={isCollapsed} css={{ float: 'right' }} to='/cadastro'>
          Cadastrar
        </NavLink>
        <NavLink collapsed={isCollapsed} css={{ float: 'right' }} to='/login'>
          Login
        </NavLink>

        <TopNavIcon
          as={HiMenu}
          size={28}
          collapsed={isCollapsed}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        ></TopNavIcon>
      </TopNavBody>
    </nav>
  );
};

export default TopNav;

