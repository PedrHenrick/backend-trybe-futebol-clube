import { Router } from 'express';
import MatchController from '../Controllers/Match.controller';

const matchRouter = Router();
matchRouter.get('/', new MatchController().getAllMatches);

export default matchRouter;
