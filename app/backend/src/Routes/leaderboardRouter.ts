import { Router } from 'express';
import LeaderboardController from '../Controllers/Leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', new LeaderboardController().getResultOfHome);

export default leaderboardRouter;
