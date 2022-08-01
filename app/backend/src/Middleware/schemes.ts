import * as joi from 'joi';

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
}).messages({
  '*': 'All fields must be filled',
});

export const matchSchema = joi.object({
  homeTeam: joi.number().min(1).required(),
  awayTeam: joi.number().min(1).required(),
  homeTeamGoals: joi.number().min(1).required(),
  awayTeamGoals: joi.number().min(1).required(),
});
