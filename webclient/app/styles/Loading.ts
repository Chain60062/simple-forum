import { styled, keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loading = styled.div`
  border: 1rem solid #f3f3f3;
  border-radius: 50%;
  border-top: 1rem solid #181ba3;
  width: 5rem;
  height: 5rem;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  margin-left: -2.5rem;
  margin-top: -2.5rem;
  transform: translate(-50%, -50%);
  animation: ${spin} 2s linear infinite;
`;

export default Loading;
