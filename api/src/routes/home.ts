import { Router } from 'express';
import { catchAsync, auth } from '../middleware';
import { pool } from '../config';

const router = Router();

router.get(
  '/home',
  auth,
  catchAsync(async (req, res) => {
    const user = await pool.query(
      'SELECT email, name FROM users WHERE id = $1',
      [req.session!.userId]
    );
    res.json(user.rows[0]);
  })
);

export default router;
