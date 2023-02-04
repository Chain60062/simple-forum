import {Request, Response, ErrorRequestHandler, NextFunction } from 'express'
const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  console.log(`O erro foi: ${err}`);
  const status = err.status || 400;
  res.status(status).send(err.message);
};

export default errorHandler;

