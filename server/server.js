import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import routes from './src/routes/index.js';
import errorHandler from './src/middleware/error.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8081;
const secret = process.env.SECRET || 'supersecretkey';

const app = express();

app.use(express.json());
// session
app.use(
  session({
    name: 'myforum_sessioncookie',
    secret,
    resave: true,
    saveUninitialized: false,
    genid: () => randomUUID(),
    cookie: {
      secure: 'auto',
      maxAge: 5184000000, //maxAge 45 dias
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


