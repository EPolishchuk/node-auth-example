import { ClientConfig, Pool } from 'pg';
require('dotenv').config({ path: '../.env.local' });

const {
  DB_USER = 'postgress',
  DB_DATABASE = 'auth',
  DB_PASSWORD = 'secret',
  DB_PORT = 5432,
  DB_HOST = 'localhost',
} = process.env;

const DB_CONFIG: ClientConfig = {
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: +DB_PORT,
  host: DB_HOST,
};

export const pool = new Pool(DB_CONFIG);
