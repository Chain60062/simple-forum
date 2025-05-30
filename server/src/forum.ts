import { randomUUID } from 'node:crypto';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import errorHandler from './middleware/error.middleware.js';
import routes from './routes.js';
import logger from './utils/logger.js';

const port = process.env.PORT ?? 8081;
const secret = process.env.SECRET ?? 'supersecretkey';
const app = express();
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:5173';
// cors
app.use(
	cors({
		credentials: true,
		origin: CLIENT_URL,
	})
);
// static directory
app.use(express.json());
app.use(express.static('public'));
// session
app.use(
	session({
		name: 'SIMPLEFORUMID',
		secret,
		resave: false,
		saveUninitialized: false,
		genid: () => randomUUID(),
		cookie: {
			maxAge: 5184000000, //maxAge 45 dias
			secure: 'auto',
			httpOnly: true,
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		},
	})
);
app.use(routes); //routes
app.use(errorHandler); //error handling
app.listen(port, () => logger.info(`Running app. Port: ${port}`));
