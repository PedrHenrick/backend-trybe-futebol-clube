import { NextFunction, Request, Response } from 'express';
import ErrorHandle from './Class/error';

const ErrorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err as ErrorHandle;
  res.status(status).json({ message });
  next();
};

export default ErrorMiddleware;
