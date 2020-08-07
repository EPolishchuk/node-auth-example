import session from 'express-session';
import redis from 'ioredis';
import connectRedis from 'connect-redis';
import { REDIS_OPTIONS, APP_PORT } from './config';
import { createApp } from './app';
require('dotenv').config({ path: '../.env.local' });

const RedisStore = connectRedis(session);

const client = new redis(REDIS_OPTIONS);

const store = new RedisStore({ client });

const app = createApp(store);

app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
