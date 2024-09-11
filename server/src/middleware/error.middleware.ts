import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from 'express'
import logger from '../utils/logger.js'
import type { ApplicationError } from './error.interfaces'

const errorHandler: ErrorRequestHandler = (
	err: ApplicationError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.error(err)
	return res.status(err.status || 400).send(err.message)
}

export default errorHandler
