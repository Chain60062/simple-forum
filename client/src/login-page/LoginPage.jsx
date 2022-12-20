import React from 'react';
import { HiIdentification, HiOutlineLockClosed } from 'react-icons/hi';
import {
  Container,
  Title,
  StyledForm,
  Row,
  InputIcon,
  Input,
  SubmitButton,
} from '../styles/Forms';

const LoginPage = () => {
  return (
    <Container>
      <Title>Entrar</Title>
      <StyledForm method='post' action=''>
        <Row>
          <InputIcon>
            <HiIdentification />
          </InputIcon>
          <Input type='text' placeholder='Nickname ou E-mail'></Input>
        </Row>
        <Row>
          <InputIcon>
            <HiOutlineLockClosed />
          </InputIcon>
          <Input type='password' placeholder='Senha'></Input>
        </Row>
        <Row>
          <SubmitButton type='submit' value='Botao'></SubmitButton>
        </Row>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;

