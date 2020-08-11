import { Request, Response, NextFunction } from 'express';
import { isLooggedIn } from '../auth';
import { Unauthorized, BadRequest } from '../errors';

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLooggedIn(req)) {
    return next(new BadRequest('You are already logged in'));
  }

  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLooggedIn(req)) {
    return next(new Unauthorized('You must be logged in'));
  }

  next();
};
