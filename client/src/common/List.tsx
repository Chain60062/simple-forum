import React from 'react';
import { StyledLink } from '../styled/Router';
import { CardProps, ListProps } from './List.types';
import {
  ListInnerContainer,
  ListOuterContainer,
  ListCard,
  ListCardTitle,
  ListCardDescription,
  Title,
} from '../styled/List';

const List = (props: ListProps) => {
  return (
    <ListOuterContainer>
      <ListInnerContainer>
        <Title>{props.title}</Title>
        {props.children}
      </ListInnerContainer>
    </ListOuterContainer>
  );
};

export const Card = (props: CardProps) => {
  return (
    <ListCard>
      <StyledLink to={props.link}>
        <ListCardTitle>{props.title}</ListCardTitle>
        <ListCardDescription>{props.description}</ListCardDescription>
      </StyledLink>
    </ListCard>
  );
};

export default List;

