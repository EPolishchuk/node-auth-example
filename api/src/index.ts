import express from 'express';
import session from 'express-session';
import { Pool } from 'pg';
import redis from 'ioredis';
import connectRedis from 'connect-redis';
import { REDIS_OPTIONS, SESSION_OPTIONS, APP_PORT, DB_CONFIG } from './config';
require('dotenv').config({ path: '../.env.local' });

const pool = new Pool(DB_CONFIG);

const RedisStore = connectRedis(session);
const client = new redis(REDIS_OPTIONS);

const app = express();

console.log('env ', process.env);

app.use(session({ ...SESSION_OPTIONS, store: new RedisStore({ client }) }));

app.get('/', (req, res) => res.json({ message: 'OK' }));

app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
