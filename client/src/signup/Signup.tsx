import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { HiOutlineUser, HiOutlineLockClosed, HiMail } from 'react-icons/hi';
import {
  Container,
  Title,
  InputIcon,
  Input,
  SubmitButton,
  StyledGridForm,
  Alert,
  AlertText,
} from '../styled/Forms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addUser } from '../util/api';
import { IUser, UserForm } from './Signup.types';
const SignupPage = () => {
  const { handleSubmit, register, reset } = useForm<UserForm>();
  const [appAlert, setAppAlert] = useState(false);
  const { mutateAsync } = useMutation(addUser, {
    onSuccess: (data) => {
      reset();
      redirect('/login');
    },
    onError: (err) => {
      alert(err);
    },
  });

  const onSubmit : SubmitHandler<UserForm> = async (data) => await mutateAsync(data);

  return (
    <>
      <Container>
        <Title>Criar Conta</Title>
        <StyledGridForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputIcon>
              <HiOutlineUser />
            </InputIcon>
            <Input
              type='text'
              placeholder='Nome'
              {...register('profile_name')}
            ></Input>
          </div>
          <div>
            <InputIcon>
              <HiOutlineUser />
            </InputIcon>
            <Input
              type='text'
              placeholder='Nickname'
              {...register('nickname')}
            ></Input>
          </div>
          <div>
            <InputIcon>
              <HiMail />
            </InputIcon>
            <Input
              type='email'
              placeholder='E-mail'
              {...register('email')}
            ></Input>
          </div>
          <div>
            <InputIcon>
              <HiOutlineLockClosed />
            </InputIcon>
            <Input
              type='password'
              placeholder='Senha'
              {...register('password')}
            ></Input>
          </div>
          <div>
            <InputIcon>
              <HiOutlineLockClosed />
            </InputIcon>
            <Input
              type='password'
              placeholder='Confirmar Senha'
              {...register('password_confirm')}
            ></Input>
          </div>
          <div>
            <SubmitButton type='submit'>Cadastrar</SubmitButton>
          </div>
        </StyledGridForm>
      </Container>
      <Alert>
        <AlertText>
          Alerta de polaco,Alerta de polaco,Alerta de polaco,Alerta de polaco
          Alerta de polaco,Alerta de polaco,Alerta de polaco,Alerta de polaco
        </AlertText>
      </Alert>
    </>
  );
};

export default SignupPage;

