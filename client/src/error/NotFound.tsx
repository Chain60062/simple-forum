import {
  NotFoundContainer,
  NotFoundText,
  NotFoundPageContainer,
} from './Error.styles';

const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <NotFoundContainer>
        <NotFoundText>
          <h1>Ops!</h1>
          <p>
            Página não encontrada, verifique se a página que está tentando
            acessar existe e se o endereço está correto, Desculpe o incômodo.
          </p>
        </NotFoundText>
      </NotFoundContainer>
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
