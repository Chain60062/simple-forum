import styled from 'styled-components';
import ErrorImage from '../assets/404.png';

export const ErrorPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${ErrorImage});
  background-size: cover;
`;

export const ErrorContainer = styled.div`
  min-height: 50vh;
  min-width: 50vw;
  border-radius: 18px;
  background-color: $secondary;
  color: white;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 600px) {
    min-height: 95vh;
    min-width: 95vw;
  }
`;
export const ErrorText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

