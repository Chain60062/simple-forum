import React from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from '../styles/Router';
import {
  ListInnerContainer,
  ListOuterContainer,
  ListCard,
  ListCardTitle,
  ListCardDescription,
  Title,
} from '../styles/List';

const List = (props) => {
  return (
    <ListOuterContainer>
      <ListInnerContainer>
        <Title>{props.title}</Title>
        {props.children}
      </ListInnerContainer>
    </ListOuterContainer>
  );
};

List.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const Card = (props) => {
  return (
    <ListCard>
      <StyledLink to={props.link}>
        <ListCardTitle>{props.title}</ListCardTitle>
        <ListCardDescription>{props.description}</ListCardDescription>
      </StyledLink>
    </ListCard>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};

export default List;

