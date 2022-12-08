// middlware de checagem de autenticacao
export const isAuthenticated = (req, res, next) => {
    return req.session.user
        ? next()
        : res
              .status(401)
              .json({ status: 401, message: 'Usuário não autorizado' });
};

