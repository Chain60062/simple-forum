import { Form } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 900px) {
    width: 95vw;
  }
  background: white;
  border-radius: 12px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
`

export const StyledGridForm = styled(Form)`
  padding: 30px;
  grid-template-columns: auto auto;
  display: grid;
  gap: 8px;
  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
`

export const StyledForm = styled(Form)`
  padding: 30px;
`

export const Row = styled.div`
  height: 45px;
  margin-bottom: 15px;
`

export const Title = styled.h1`
  height: 70px;
  background: linear-gradient(
    130deg,
    rgba(34, 54, 151, 1) 30%,
    rgba(104, 15, 247, 1) 70%
  );
  border-radius: 12px 12px 0 0;
  color: white;
  font-weight: 600;
  align-items: center;
  display: flex;
  justify-content: center;
`

export const InputIcon = styled.i`
  position: absolute;
  z-index: 2;
  width: 48px;
  height: 45px;
  padding: 0;
  border-radius: 12px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`
export const Input = styled.input`
  height: 46px;
  width: 100%;
  padding-left: 60px;
  border: 1px solid white;
  border-bottom: 2px solid #680ff7;
  border-radius: 12px 12px 0px 0px;
  outline: none;
  font-size: 14px;
  margin-bottom: 15px;

  &:focus {
    box-shadow: inset 0px 0px 2px 2px rgba(34, 54, 151, 0.5);
  }
`

export const SubmitButton = styled.button`
  color: white;
  font-size: 24px;
  padding: 10px;
  background: #680ff7;
  border: 1px solid white;
  border-radius: 12px;
  margin: auto;
`

export const Alert = styled.div`
  position: absolute;
  width: 40%;
  height: 80px;
  background-color: Red;
  right: 20;
  bottom: 20;
  overflow: hidden;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 12px;
`

export const AlertText = styled.h4`
  color: white;
  vertical-align: bottom;
`

export const AddForm = styled(Form)`
  padding: 12px;
  font-size: 14px;
  color: white;
  &:focus {
    box-shadow: inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25);
  }
`

export const TextInput = styled.input`
  display: block;
  padding: 8px;
  margin: 8px;
  width: 100%;
  border: 0px;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
`

export const FormFooter = styled.div`
  width: 100%;
  height: 36px;
  margin-top: 12px;
`
export const Submit = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 8rem;
  padding: 12px 16px;
  margin: 12px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: #0f362b;
  color: #349e81;
`

export const AdminContainer = styled.div`
  position: relative;
  width: 60vw;
  min-height: 30vh;
  margin: 12px auto;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  background-color: #349e81;
`
export const RequiredAlert = styled.p`
  color: #fa0707;
  font-weight: bold;
  font-size: 16px;
`

export const AdminLabel = styled.label`
  color: #0f362b;
  font-size: 18px;
`
