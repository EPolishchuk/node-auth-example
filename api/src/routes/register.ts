import { Router } from 'express';
import { registerShema } from '../validation';
import { pool } from '../config';
import { logIn } from '../auth';
import { guest } from '../middleware';

const router = Router();

router.post('/register', guest, async (req, res) => {
  await registerShema.validateAsync(req.body, { abortEarly: false });

  const { email, name, password } = req.body;

  try {
    const userFound: any = await pool.query(
      'SELECT email FROM users WHERE email = $1',
      [email]
    );

    if (userFound.rows.length) {
      res.json({ error: 'email is invalid' });
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
        res.json({ error: 'registration failed' });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ message: 'registration failed' });
  }
});

export default router;
