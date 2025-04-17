import pg from 'pg'
import logger from '../utils/logger.js'

const connectionString = process.env.DATABASE_URI

//caso não tenha provido a string de conexão, fechar processo
if (!connectionString) {
	logger.error(
		'No database connection string provided, set the DATABASE_URI enviroment variable.',
	)
	process.exit(1)
}

const pool = new pg.Pool({ connectionString })

//separar cliente para transactions, código deve fechar explicitamente com relese()
export const getClient = () => {
	return pool.connect()
}

export default pool
