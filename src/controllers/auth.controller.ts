import express from 'express';
import { NextFunction } from 'express/ts4.0';
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../libs/constants';

const HttpError = require('../models/http-error');

export const auth = (req: any, res: express.Response, next: NextFunction) => {
  try {
    const token = (req as any).headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error(ERROR_MESSAGES.FAILED_AUTH);
    }

    const decodedToken: any = jwt.verify(token, process?.env?.JWT_KEY || '');
    req.userData = { userId: decodedToken.userId };

    res.status(200);
  } catch (err) {
    res.status(401);

    return next(new HttpError(
      ERROR_MESSAGES.FAILED_AUTH,
      401
    ));
  }
};
