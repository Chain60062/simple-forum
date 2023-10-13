import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { ApplicationError } from './error.interfaces';
import logger from '../utils/logger.js';

const errorHandler: ErrorRequestHandler = (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  return res.status(err.status || 400).send(err.message);
};

export default errorHandler;

