import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface INavLinkProps {
  collapsed?: boolean;
}

export const TopNavBody = styled.div`
  background-color: #223697;
  overflow: hidden;
  grid-area: topnav;
`;

export const NavLink = styled(Link)<INavLinkProps>`
  float: left;
  color: white;
  border-radius: 12px;
  margin: 8px 2px;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
  font-size: 18px;

  &:not(:first-child) {
    @media (max-width: 900px) {
      display: none;
    }
  }

  &:hover {
    color: white;
  }
`;

export const TopNavIcon = styled.a<INavLinkProps>`
  color: white;
  display: none;

  @media (max-width: 900px) {
    float: right;
    display: block;
  }

  ${({ collapsed }: { collapsed?: boolean }) =>
    collapsed &&
    `
    @media (max-width: 900px) {
      position: absolute;
      right: 0;
      top: 0;
    }
  `}
`;

