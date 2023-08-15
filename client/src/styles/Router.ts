import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledLink = styled(Link)`
  margin: 0px;
  padding: 0;
  all: unset;
  &:hover {
    cursor: pointer;
  }
`;
