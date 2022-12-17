import React from 'react';
import { Form } from 'react-router-dom'
const SignupPage = () => {
    return (
        <Form method='post' action=''>
            <input type="text" name='Nome do Usuário'></input>
            <input type="text" name='Apelido'></input>
            <input type="email" name='E-mail'></input>
            <input type="password" name='Senha'></input>
            <input type="password" name='Confirmar Senha'></input>
            <button type="submit">Entrar</button>
        </Form>
    );
}

export default SignupPage;