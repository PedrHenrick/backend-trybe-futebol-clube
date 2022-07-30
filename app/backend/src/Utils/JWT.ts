import * as jwt from 'jsonwebtoken';
import IUSer from '../Interfaces/IUser';
import ErrorHandle from '../Middleware/Class/error';

const SECRET = process.env.JWT_SECRET || '96e2c84bf0244e7f8e4075b11ec81929';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  noTimestamp: true,
};

export const generateJWTToken = (payload: IUSer) =>
  jwt.sign(payload, SECRET, jwtConfig);

export const authenticateToken = async (token: string) => {
  try {
    const hasValid = jwt.verify(token, SECRET, jwtConfig);
    return hasValid as IUSer;
  } catch (_err) {
    throw new ErrorHandle(401, 'Invalid token');
  }
};
