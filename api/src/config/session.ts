import { SessionOptions } from 'express-session';
import { IN_PROD } from './app';
require('dotenv').config({ path: '../.env.local' });

const HALF_HOUR = 1000 * 60 * 30;

export const {
  SESSION_SECRET = 'this is extreme secret',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
