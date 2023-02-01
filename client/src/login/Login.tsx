import React, { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { HiIdentification, HiOutlineLockClosed } from 'react-icons/hi';
import {
  Container,
  Title,
  StyledForm,
  Row,
  InputIcon,
  Input,
  SubmitButton,
} from '../styled/Forms';
import { login } from '../util/api';
import { LoginForm } from './Login.types';

const LoginPage = () => {
  const { setLoggedUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutateAsync } = useMutation(login, {
    onSuccess: (data) => {
      setLoggedUser(data);
    },
    onError: (err) => {
      alert(`there was an error ${err}`);
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) =>
    await mutateAsync(data);

  return (
    <Container>
      <Title>Entrar</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <InputIcon>
            <HiIdentification />
          </InputIcon>
          <Input
            type='text'
            placeholder='E-mail'
            {...register('email')}
          ></Input>
        </Row>
        <Row>
          <InputIcon>
            <HiOutlineLockClosed />
          </InputIcon>
          <Input
            type='password'
            placeholder='Senha'
            {...register('password')}
          ></Input>
        </Row>
        <Row>
          <SubmitButton type='submit'>Entrar</SubmitButton>
        </Row>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;

