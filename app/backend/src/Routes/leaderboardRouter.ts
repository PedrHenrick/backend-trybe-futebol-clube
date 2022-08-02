import { Router } from 'express';
import LeaderboardController from '../Controllers/Leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', new LeaderboardController().getResultOfHome);
leaderboardRouter.get('/away', new LeaderboardController().getResultOfAway);
leaderboardRouter.get('/', new LeaderboardController().getResult);

export default leaderboardRouter;
