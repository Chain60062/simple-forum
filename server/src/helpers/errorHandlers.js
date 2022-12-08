import { jsonMessage } from './jsonResponse';
// checagem de possiveis erros relacionados ao db
export const sqlErrors = {
  users_username_key: (res) => jsonMessage(res, 500, 'Este nome de usuário já está em uso'),
  users_email_key: (res) => jsonMessage(res, 500, 'Este email já está em uso'),
  default: (res) => jsonMessage(res, 500, 'Um erro inesperado ocorreu'),
};

