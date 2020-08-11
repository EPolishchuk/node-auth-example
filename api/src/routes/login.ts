import { Router } from 'express';
import { validate, loginSchema } from '../validation';
import { pool } from '../config';
import { logIn, logOut } from '../auth';
import { catchAsync, guest, auth } from '../middleware';
import { compare } from 'bcryptjs';
import { Unauthorized } from '../errors';

const router = Router();

router.post(
  '/login',
  guest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const userFound: any = await pool.query(
      'SELECT id, email, password FROM users WHERE email = $1',
      [email]
    );

    if (userFound.rows.length) {
      let passwordMatch = await compare(password, userFound.rows[0].password);

      if (passwordMatch) {
        logIn(req, userFound.rows[0].id);
        res.json({ message: 'Logged in!' });
      } else {
        throw new Unauthorized('Incorrect email or password');
      }
    } else {
      throw new Unauthorized('Incorrect email or password');
    }
  })
);

router.post(
  '/logout',
  auth,
  catchAsync(async (req, res) => {
    await logOut(req, res);
    res.json({ message: 'Logged out!' });
  })
);

export default router;
