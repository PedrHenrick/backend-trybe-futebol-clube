import { Router } from 'express';
import TeamController from '../Controllers/Team.controller';

const teamRouter = Router();
teamRouter.get('/', new TeamController().getAllTeams);
// teamRouter.get('/:id', new TeamController().validate);

export default teamRouter;
