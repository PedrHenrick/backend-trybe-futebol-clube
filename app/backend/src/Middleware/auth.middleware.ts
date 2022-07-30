import { NextFunction, Request, Response } from 'express';
import ErrorHandle from './Class/error';
import { authenticateToken } from '../Utils/JWT';

const authenticateMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw new ErrorHandle(401, 'Unauthorized');
  else await authenticateToken(token);
  next();
};

export default authenticateMiddleware;
