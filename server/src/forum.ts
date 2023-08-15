import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import errorHandler from './middleware/error.middleware.js';
import cors from 'cors';
import routes from './routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8081;
const secret = process.env.SECRET || 'supersecretkey';
const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use(express.json());
app.use(express.static('public'));
// session
app.use(
  session({
    name: 'simpleforumid',
    secret,
    resave: false,
    saveUninitialized: false,
    genid: () => randomUUID(),
    cookie: {
      maxAge: 5184000000, //maxAge 45 dias
      secure: 'auto',
      httpOnly: true,
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    },
  }),
);
// logging
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use(routes);
app.use(errorHandler);
app.listen(port, () => console.log(`Rodando na porta: ${port}`));

