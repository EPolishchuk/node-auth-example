import { Router } from 'express';
import { validate, registerShema } from '../validation';
import { pool, BCRYPT_WORK_FACTOR } from '../config';
import { logIn } from '../auth';
import { catchAsync, guest } from '../middleware';
import { hash } from 'bcryptjs';

const router = Router();

router.post(
  '/register',
  guest,
  catchAsync(async (req, res) => {
    await validate(registerShema, req.body);

    const { email, name } = req.body;

    let { password } = req.body;

    password = await hash(password, BCRYPT_WORK_FACTOR);

    try {
      const userFound: any = await pool.query(
        'SELECT email FROM users WHERE email = $1',
        [email]
      );

      if (userFound.rows.length) {
        res.json({ error: 'Email is invalid' });
      } else {
        try {
          const user = await pool.query(
            'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id',
            [email, name, password]
          );

          logIn(req, user.rows[0].id);

          res.json({ success: "You've registred!" });
        } catch (error) {
          console.log(error.message);
          res.json({ error: 'Registration failed' });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.json({ message: 'Registration failed' });
    }
  })
);

export default router;
