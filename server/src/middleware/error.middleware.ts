import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log(`erro ${err.message}`);
  const status = err.status || 400;
  res.status(status).send(err.message);
};

export default errorHandler;

