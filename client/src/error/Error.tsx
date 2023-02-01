import React from "react";
import { ErrorContainer, ErrorText, ErrorPageContainer } from './Error.styles';

const ErrorPage = () => {
    return (
        <ErrorPageContainer>
        <ErrorContainer>
            <ErrorText>
                <h1>Ops!</h1>
                <p>Um erro desconhecido ocorreu, verifique se a página que está tentando acessar existe e se o endereço está correto,
                    Desculpe o incômodo.
                </p>
            </ErrorText>
        </ErrorContainer>

        </ErrorPageContainer>
    );
}

export default ErrorPage;