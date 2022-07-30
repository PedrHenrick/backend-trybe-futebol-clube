import { NextFunction, Request, Response } from 'express';
import ErrorHandle from './Class/error';

const ErrorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as ErrorHandle;
  res.status(status).json({ message });
};

export default ErrorMiddleware;
