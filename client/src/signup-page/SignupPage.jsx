import React from 'react';
import { HiOutlineUser, HiOutlineLockClosed, HiMail } from 'react-icons/hi';
import {
  Container,
  Title,
  InputIcon,
  Input,
  SubmitButton,
  StyledGridForm,
} from '../styles/Forms';

const SignupPage = () => {
  return (
    <Container>
        <Title>Criar Conta</Title>
        <StyledGridForm method='post' action=''>
          <div>
            <InputIcon>
              <HiOutlineUser />
            </InputIcon>
            <Input type='text' placeholder='Nickname'></Input>
          </div>
          <div>
            <InputIcon>
              <HiMail />
            </InputIcon>
            <Input type='email' placeholder='E-mail'></Input>
          </div>
          <div>
            <InputIcon>
              <HiOutlineLockClosed />
            </InputIcon>
            <Input type='password' placeholder='Senha'></Input>
          </div>
          <div>
            <InputIcon>
              <HiOutlineLockClosed />
            </InputIcon>
            <Input type='password' placeholder='Confirmar Senha'></Input>
          </div>
          <div>
            <SubmitButton type='submit' value='Botao'></SubmitButton>
          </div>
        </StyledGridForm>
    </Container>
  );
};

export default SignupPage;

