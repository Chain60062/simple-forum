import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface INavLinkProps {
	collapsed?: boolean
}

export const TopNavBody = styled.div`
  background-color: #223697;
  height: 3rem;
  grid-area: topnav;
  display: flex;
  align-items: center;
  justify-content: end;
`

export const NavLink = styled(Link)<INavLinkProps>`
  font-size: 1,125rem;
  color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.5rem 0.6rem;
  margin: 0.2rem;
  text-decoration: none;
  transition: background-color .3s;

  &:not(:first-child) {
    @media (max-width: 900px) {
      display: none;
    }
  }

  &:hover {
    background-color: #4e5eab;
    color: white;
  }
`;

export const LogoutNavLink = styled.a`
  color: white;
  border-radius: 0.5rem;
  margin: 0.5rem 0.1rem;
  padding: 0.5rem 0.8rem;
  text-align: center;
  text-decoration: none;
  font-size: 1,125rem;
  transition: background-color .3s;
  cursor: pointer;
  
  &:not(:first-child) {
    @media (max-width: 900px) {
      display: none;
    }
  }

  &:hover {
    background-color: #4e5eab;
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
`
