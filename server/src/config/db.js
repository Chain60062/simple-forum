import pg from 'pg';
import * as dotenv from 'dotenv'; 
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

export default pool;

