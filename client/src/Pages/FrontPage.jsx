import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TiThMenu } from 'react-icons/ti';
import { TopNavBody, TopNavIcon, TopNavLink } from '../Styles/TopNav';

const FrontPage = () => {
  return (
    <>
      <TopNavBar />
      <Topics></Topics>
    </>
  );
};
const Topics = (props) =>{
  return(
    <div>
      
    </div>
  );
}
const TopBarLink = (props) => {
  return (
    <TopNavLink collapsed={props.isCollapsed}>{props.linkText}</TopNavLink>
  );
};

const TopNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <nav>
      <TopNavBody>
        <TopBarLink isCollapsed={isCollapsed} linkText='Home' />
        <TopBarLink isCollapsed={isCollapsed} linkText='About' />
        <TopBarLink isCollapsed={isCollapsed} linkText='Login' />

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

// Type Checking
TopBarLink.propTypes = {
  isCollapsed: PropTypes.bool,
  linkText: PropTypes.string,
};

export default FrontPage;

