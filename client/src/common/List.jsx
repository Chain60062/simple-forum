import React from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from '../styles/Router'
import { ListInnerContainer, ListOuterContainer, ListCard, ListCardTitle, ListCardDescription } from '../styles/List'

const List = (props) => {
    return (
        <ListOuterContainer>
            <ListInnerContainer>
                {props.children}
            </ListInnerContainer>
        </ListOuterContainer>
    );
}
List.propTypes = {
    children: PropTypes.node.isRequired
}
export const Card = (props) => {
    return (
        <ListCard>
            <StyledLink to=''>
                <ListCardTitle>
                    {props.description}
                </ListCardTitle>
                <ListCardDescription>
                    {props.title}
                </ListCardDescription>
            </StyledLink>
        </ListCard>
    );
}
Card.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default List;