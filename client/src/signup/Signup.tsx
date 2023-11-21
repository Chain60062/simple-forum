import { useMutation } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineLockClosed, HiMail } from 'react-icons/hi';
import {
  Container,
  Title,
  InputIcon,
  Input,
  SubmitButton,
  StyledGridForm,
  RequiredAlert,
} from '../styles/Forms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addUser } from '../api/users';
import { UserForm } from './Signup.interfaces';

const SignupPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserForm>();

  const { mutateAsync, isSuccess, data } = useMutation(addUser, {
    useErrorBoundary: true,
    onSuccess: (data) => {
      if (data.status !== 200) {
        alert('Houve um erro, tente novamente.');
        reset();
      }
    },
    onError: () => {
      alert('Houve um erro, tente novamente.');
      reset();
    },
  });

  const onSubmit: SubmitHandler<UserForm> = async (data) =>
    await mutateAsync(data);

  if (isSuccess) {
    if (data.status === 200) {
      return <Navigate to='/login' />;
    }
  }

  return (
    <>
      <Container>
        <Title>Criar Conta</Title>
        <StyledGridForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            {errors.user_name?.type === 'required' && (
              <RequiredAlert role='alert'>Usuário é obrigatório.</RequiredAlert>
            )}
            <InputIcon>
              <HiOutlineUser />
            </InputIcon>
            <Input
              type='text'
              placeholder='Nome'
              {...register('user_name', { required: true })}
            ></Input>
          </div>

          <div>
            {errors.profile_name?.type === 'required' && (
              <RequiredAlert role='alert'>Nome é obrigatório.</RequiredAlert>
            )}
            <InputIcon>
              <HiOutlineUser />
            </InputIcon>
            <Input
              type='text'
              placeholder='Nome do Perfil'
              {...register('profile_name', { required: true })}
            ></Input>
          </div>
          <div>
            {errors.email?.type === 'required' && (
              <RequiredAlert role='alert'>E-Mail é obrigatório.</RequiredAlert>
            )}
            <InputIcon>
              <HiMail />
            </InputIcon>
            <Input
              type='email'
              placeholder='E-mail'
              {...register('email', { required: true })}
            ></Input>
          </div>
          <div>
            {errors.password?.type === 'required' && (
              <RequiredAlert role='alert'>Senha é obrigatória.</RequiredAlert>
            )}
            <InputIcon>
              <HiOutlineLockClosed />
            </InputIcon>
            <Input
              type='password'
              placeholder='Senha'
              {...register('password', { required: true })}
            ></Input>
          </div>
          <div>
            {errors.password?.type === 'required' && (
              <RequiredAlert role='alert'>Confirme a senha.</RequiredAlert>
            )}
            <InputIcon>
              <HiOutlineLockClosed />
            </InputIcon>
            <Input
              type='password'
              placeholder='Confirmar Senha'
              {...register('password_confirm', { required: true })}
            ></Input>
            <SubmitButton type='submit'>Cadastrar.</SubmitButton>
          </div>
        </StyledGridForm>
      </Container>
    </>
  );
};

export default SignupPage;

