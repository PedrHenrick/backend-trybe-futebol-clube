import { Router } from 'express';
import { matchSchema } from '../Middleware/schemes';
import validateMiddleware from '../Middleware/validate.middleware';
import authenticateMiddleware from '../Middleware/auth.middleware';
import MatchController from '../Controllers/Match.controller';

const matchRouter = Router();
matchRouter.get('/', new MatchController().getAllMatches);
matchRouter.post(
  '/',
  authenticateMiddleware,
  validateMiddleware(matchSchema),
  new MatchController().addMatch,
);
matchRouter.patch('/:id/finish', new MatchController().endMatch);
matchRouter.patch('/:id', new MatchController().updateMatch);

export default matchRouter;
