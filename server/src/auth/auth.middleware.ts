import type { NextFunction, Request, Response } from 'express';

// middlware de checagem de autenticacao
export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.session.user
		? next()
		: res.status(401).json({ status: 401, message: 'Usuário não autenticado' });
};
