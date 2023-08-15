import React from 'react';
import { StyledLink } from '../styles/Router';
import { CardProps, ListProps } from './Lists.types';
import {
  ItemsBox,
  ItemsCard,
  ItemsCardTitle,
  ItemsCardDescription,
  ItemsTitle,
} from '../styles/Lists';

const ItemsList = (props: ListProps) => {
  return (
    <ItemsBox>
      <ItemsTitle>{props.title}</ItemsTitle>
      {props.children}
    </ItemsBox>
  );
};

export const ItemCard = (props: CardProps) => {
  return (
      <ItemsCard>
        <StyledLink to={props.link}>
          <ItemsCardTitle>{props.title}</ItemsCardTitle>
          <ItemsCardDescription>{props.description}</ItemsCardDescription>
        </StyledLink>
      </ItemsCard>
  );
};

export default ItemsList;

