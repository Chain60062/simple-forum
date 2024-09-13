import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const Loading = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid $primary;
  animation: ${spin} 2s linear infinite;
`
export default Loading
