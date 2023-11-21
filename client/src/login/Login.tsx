import { useContext } from 'react';
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
  RequiredAlert,
} from '../styles/Forms';
import { login } from '../api/auth';
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

  const { mutate, isSuccess, data } = useMutation(login, {
    onSuccess: async (data) => {
      if (data.status === 401) {
        reset();
        alert(await data.json());
      } else {
        setLoggedUser(await data.json());
      }
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (user) => mutate(user);

  if (isSuccess) {
    if (data.status !== 401) {
      return <Navigate to='/' />;
    }
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
            {...register('email', { required: true })}
          ></Input>
        </Row>
        {errors.email?.type === 'required' && (
          <RequiredAlert role='alert'>E-Mail é obrigatório</RequiredAlert>
        )}
        <Row>
          <InputIcon>
            <HiOutlineLockClosed />
          </InputIcon>
          <Input
            type='password'
            placeholder='Senha'
            {...register('password', { required: true })}
          ></Input>
        </Row>
        {errors.password?.type === 'required' && (
          <RequiredAlert role='alert'>Senha é obrigatória</RequiredAlert>
        )}
        <Row>
          <SubmitButton type='submit'>Entrar</SubmitButton>
        </Row>
      </StyledForm>
    </Container>
  );
};
export default LoginPage;

