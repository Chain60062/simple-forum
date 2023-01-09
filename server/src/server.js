import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';
import errorHandler from './middleware/error.js';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8081;
const secret = process.env.SECRET || 'supersecretkey';
const environment = process.env.NODE_ENV || 'development';
const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use(express.json());
// session
app.use(
  session({
    name: 'simpleforumuser',
    secret,
    resave: true,
    saveUninitialized: false,
    genid: () => randomUUID(),
    cookie: {
      maxAge: 5184000000, //maxAge 45 dias
      secure: 'auto',
      sameSite: environment == 'production' ? 'none' : 'lax',
    },
  }),
);
// logging
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));
// rotas
app.use(routes);
// error handler
app.use(errorHandler);
app.listen(port, console.log(`Rodando na porta: ${port}`));

