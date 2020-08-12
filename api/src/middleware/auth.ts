import { Request, Response, NextFunction } from 'express';
import { isLooggedIn, logOut } from '../auth';
import { Unauthorized, BadRequest } from '../errors';
import { SESSION_ABSOLUTE_TIMEOUT } from '../config';

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

export const active = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isLooggedIn(req)) {
    const now = Date.now();
    const { cratedAt } = req.session as Express.Session;

    if (now + cratedAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logOut(req, res);

      return next(new Unauthorized('Session expired'));
    }
  }

  next();
};
