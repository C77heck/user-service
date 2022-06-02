import express, { NextFunction } from 'express';

export const setHeaders = (req: express.Request, res: express.Response, next: NextFunction) => {
  res.setHeader('Accept', '*/*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
};
