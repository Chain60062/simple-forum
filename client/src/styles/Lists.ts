import styled from 'styled-components';
import { StyledLink } from './Router';

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 54px;
  height: calc(100vh - 108px); //margin + navbar height
`;

// Container
export const ItemsBox = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-height: 60vh;
  min-width: 60vw;
  padding: 2rem;
  background-color: #1d3869;
  border-radius: 12px;
  gap: 16px;

  @media (max-width: 1300px) {
    max-width: 80vw;
  }
`;

export const ItemsTitle = styled.h1`
  width: 100%;
  color: white;
  text-align: center;
  max-height: 80px;
  margin-bottom: 2rem;
  font-size: 34px;
  background-color: #152a4d;
  padding: 14px;
  border-radius: 12px;
`;

// Topic or Subtopic Card
export const ItemsCard = styled.div`
  flex-basis: calc(50% - 8px); //or width: calc(50% - 12);
  /* width: calc((100% / 3) - 12px);//three columns */
  min-height: 80px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  color: #0f362b;
  background-color: #349e81;
  padding: 12px;
  transition: box-shadow 1000ms ease-in, 500ms ease-out;
  border: 4px solid #1a4f40;

  &:hover {
    box-shadow: 4px 4px 12px 2px #1e6c57;
  }

  @media (max-width: 720px) {
    flex-basis: 100%; /* Single card per row on smaller screens */
  }
`;
export const ItemsCardButtons = styled.div`
display: flex;
justify-content: flex-end;
`;
// Topic or Subtopic icon
export const ItemsCardIcon = styled.img`
  height: 80%;
  width: 80%;
  background-color: white;
`;

export const ItemsCardTitle = styled.div`
  font-size: 24px;
`;
export const ItemsCardDescription = styled.div`
  font-size: 12px;
  margin-top: $xs;
`;

export const StyledItemsCardButton = styled.a`
  display: flex;
  border-radius: 50%;
  margin: 0px 2px;
  padding: 8px;
  transition: background-color 0.3s;
  &:hover {
    color: #1e6c57;
    background-color: #1a4f40;
  }
`;
