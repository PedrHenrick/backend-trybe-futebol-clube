import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import ErrorHandle from './Class/error';

const validateMiddleware = (schema: Joi.AnySchema) => (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  console.log(typeof schema);
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const { message } = error.details[0];
    throw new ErrorHandle(400, message);
  }
  next();
};

export default validateMiddleware;
