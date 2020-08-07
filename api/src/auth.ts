import { Request } from 'express';

export const isLooggedIn = (req: Request) => !!req.session!.userId;

export const logIn = (req: Request, userId: string) => {
  req.session!.userId = userId;
};
