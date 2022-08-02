import { Router } from 'express';
import loginRouter from './loginRouter';
import teamRouter from './teamRouter';
import matchRouter from './matchRouter';
import leaderboardRouter from './leaderboardRouter';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
