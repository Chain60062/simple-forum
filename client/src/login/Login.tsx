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
} from '../styles/Forms';
import { login } from '../util/api';
import { LoginForm } from './Login.types';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { setLoggedUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutateAsync, isSuccess } = useMutation(login, {
    onSuccess: (data) => {
      reset();
      setLoggedUser(data);
    },
    onError: (err: Error) => {
      alert(`Houve um erro: ${err.message}`);
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) =>
    await mutateAsync(data);

  //Redirect after successful login attempt
  if (isSuccess) {
    return <Navigate to='/' />;
  }

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
