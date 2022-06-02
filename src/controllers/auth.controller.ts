import express from 'express';
import { NextFunction } from 'express/ts4.0';
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../libs/constants';

export const authenticate = (req: any, res: express.Response, next: NextFunction) => {
  try {
    const token = req.headers.bearer;

    if (!token) {
      throw new Error(ERROR_MESSAGES.FAILED_AUTH);
    }

    jwt.verify(token, process?.env?.JWT_KEY || '');

    res.status(200).end();
  } catch (err) {
    console.log({ err });
    res.status(401).end();
  }
};
