import React, { useState, useCallback } from 'react';
import { HiOutlineUser, HiOutlineLockClosed, HiMail } from 'react-icons/hi';
import {
  Container,
  Title,
  InputIcon,
  Input,
  SubmitButton,
  StyledGridForm,
} from '../styles/Forms';
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await fetch(`${url}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          nickname,
          email,
          password,
        }),
      }).then((res) => {
        res.json();
        if (res.status === 200) {
          setName('');
          setNickname('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setResponseMessage('User created successfully');
          console.log('CRIADO COM SUCESSO');
        } else {
          setResponseMessage('Some error occured');

          console.log('CRIADO COM ERRO');
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <Container>
      <Title>Criar Conta</Title>
      <StyledGridForm method='POST' onSubmit={handleSubmit}>
        <div>
          <InputIcon>
            <HiOutlineUser />
          </InputIcon>
          <Input
            type='text'
            placeholder='Nome'
            value={name}
            onChange={useCallback((e) => setName(e.target.value), [setName])}
          ></Input>
        </div>
        <div>
          <InputIcon>
            <HiOutlineUser />
          </InputIcon>
          <Input
            type='text'
            placeholder='Nickname'
            value={nickname}
            onChange={useCallback(
              (e) => setNickname(e.target.value),
              [setNickname]
            )}
          ></Input>
        </div>
        <div>
          <InputIcon>
            <HiMail />
          </InputIcon>
          <Input
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={useCallback((e) => setEmail(e.target.value), [setEmail])}
          ></Input>
        </div>
        <div>
          <InputIcon>
            <HiOutlineLockClosed />
          </InputIcon>
          <Input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={useCallback(
              (e) => setPassword(e.target.value),
              [setPassword]
            )}
          ></Input>
        </div>
        <div>
          <InputIcon>
            <HiOutlineLockClosed />
          </InputIcon>
          <Input
            type='password'
            placeholder='Confirmar Senha'
            value={confirmPassword}
            onChange={useCallback(
              (e) => setConfirmPassword(e.target.value),
              [setConfirmPassword]
            )}
          ></Input>
        </div>
        <div>
          <SubmitButton type='submit' value='Botao'></SubmitButton>
        </div>
      </StyledGridForm>
    </Container>
  );
};

export default SignupPage;

