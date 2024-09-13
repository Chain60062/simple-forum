import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface INavLinkProps {
	collapsed?: boolean
}

export const TopNavBody = styled.div`
  background-color: #223697;
  height: 54px;
  grid-area: topnav;
`

export const NavLink = styled(Link)<INavLinkProps>`
  float: left;
  color: white;
  border-radius: 6px;
  margin: 8px 4px;
  padding: 8px 14px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
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
`

export const LogoutNavLink = styled.a`
  color: white;
  border-radius: 6px;
  margin: 8px 2px;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
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
`

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
