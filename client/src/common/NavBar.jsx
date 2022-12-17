import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TiThMenu } from 'react-icons/ti';
import { TopNavBody, TopNavIcon, TopNavLink } from '../styles/TopNav';

const NavBarLink = (props) => {
  return (
    <TopNavLink collapsed={props.isCollapsed}>{props.linkText}</TopNavLink>
  );
};

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <nav>
      <TopNavBody>
        <NavBarLink isCollapsed={isCollapsed} linkText='Home' />
        <NavBarLink isCollapsed={isCollapsed} linkText='About' />
        <NavBarLink isCollapsed={isCollapsed} linkText='Login' />

        <TopNavIcon
          as={TiThMenu}
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

NavBarLink.propTypes = {
  isCollapsed: PropTypes.bool,
  linkText: PropTypes.string,
};

export default NavBar;