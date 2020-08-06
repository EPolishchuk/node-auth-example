import { RedisOptions } from 'ioredis';
require('dotenv').config({ path: '../.env.local' });

const {
  REDDIS_PORT = 6379,
  REDIS_HOST = 'localhost',
  REDIS_PASSWORD = 'password',
} = process.env;

export const REDIS_OPTIONS: RedisOptions = {
  port: +REDDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
};
