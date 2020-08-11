import { Router } from 'express';
import { validate, registerSchema } from '../validation';
import { pool, BCRYPT_WORK_FACTOR } from '../config';
import { logIn } from '../auth';
import { catchAsync, guest } from '../middleware';
import { hash } from 'bcryptjs';

const router = Router();

router.post(
  '/register',
  guest,
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;

    let passwordEncrypted = await hash(password, BCRYPT_WORK_FACTOR);

    const userFound: any = await pool.query(
      'SELECT email FROM users WHERE email = $1',
      [email]
    );

    if (userFound.rows.length) {
      res.json({ error: 'Email is invalid' });
    } else {
      const user = await pool.query(
        'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id',
        [email, name, passwordEncrypted]
      );

      logIn(req, user.rows[0].id);

      res.json({ success: "You've registred!" });
    }
  })
);

export default router;
