import { Request, Response, NextFunction } from "express";
import crypto from 'crypto';

export const userIdCookie = ((req: Request, res: Response, next: NextFunction) => {
  const userId = req.cookies.userId;

  if (!userId) {
    const userId = crypto.randomBytes(16).toString("hex");
    console.log('new cookie created', { userId })
    res.cookie('userId', userId, { maxAge: 90000000 });
  } else {
    console.log('cookie exists', userId);
  }

  next();
});