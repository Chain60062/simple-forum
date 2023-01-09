import React, { useState, useCallback } from 'react';
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
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await fetch(`${url}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            setEmail('');
            setPassword('');
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
      <Title>Entrar</Title>
      <StyledForm method='POST' onSubmit={handleSubmit}>
        <Row>
          <InputIcon>
            <HiIdentification />
          </InputIcon>
          <Input
            type='text'
            placeholder='E-mail'
            value={email}
            onChange={useCallback((e) => setEmail(e.target.value), [setEmail])}
          ></Input>
        </Row>
        <Row>
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
        </Row>
        <Row>
          <SubmitButton type='submit' value='Botao'></SubmitButton>
        </Row>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;

