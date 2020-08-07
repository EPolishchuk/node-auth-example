import { Request, Response, NextFunction } from 'express';
import { isLooggedIn } from '../auth';

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLooggedIn(req)) {
    return next(new Error('You are already logged in'));
  }

  next();
};
