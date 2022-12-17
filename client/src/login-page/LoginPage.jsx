import { styled } from '../stitches';
import React from 'react';
import { Form } from 'react-router-dom'

const LoginPage = () => {
    return (
        <Form method='post' action=''>
            <input type="text" name='Nickname ou E-mail'></input>
            <input type="password" name='Senha'></input>
            <button type="submit">Entrar</button>
        </Form>
    );
}
const LoginContainer = styled('div', {
    maxWidth: '440px',
    padding: '0 20px',
    margin: '170px auto'
})
const Wrapper = styled('div', {
    width: '100%',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px 1px rgba(0, 0, 0, 0.1)'
})
const StyledForm = styled(Form, {
    padding: '30px'
})
const Row = styled('div', {
    height: '45px',
    marginBottom: '15px',
    position: 'relative'
})
const Title = styled('div', {
    height: '90px',
    background: '#16a085',
    borderRadius: '5px 5px 0 0',
    color: '#fff',
    fontSize: '30px',
    fontWeight: '600',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
})
const Input = styled('input', {
    height: '100%',
    width: '100%',
    outline: 'none',
    paddingLeft: '60px',
    borderRadius: '5px',
    border: '1px solid lightgrey',
    fontSize: '16px',
    transition: 'all 0.3s ease'
});

export default LoginPage;