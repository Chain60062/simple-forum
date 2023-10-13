import pg from 'pg';
import * as dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const connectionString = process.env.DATABASE_URI;

if (!connectionString) {
  logger.error('No database connection string provided, set the DATABASE_URI enviroment variable.');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });

pool.on('connect', () => {
  console.info('Client connection established successfully.');
});

pool.on('error', (error: Error) => {
  throw error;
});

export default pool;

