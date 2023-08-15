import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.DATABASE_URI;
// if (!connectionString) {
//   throw new Error(
//     'Please provide a database connection string via the DATABASE_URI environment variable. E.g. DATABASE_URL=postgresql://myuser:mypassword123@localhost/simpleforum',
//   );
// }
const pool = new pg.Pool({ connectionString });
pool.on('connect', () => {
    console.info('Client connection stablished successfully.');
});
pool.on('error', (error) => {
    throw error;
});
export default pool;
