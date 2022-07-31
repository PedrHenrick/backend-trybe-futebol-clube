import * as joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
}).messages({
  '*': 'All fields must be filled',
});

export default loginSchema;
