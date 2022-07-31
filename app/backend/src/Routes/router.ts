import { Router } from 'express';
import loginRouter from './loginRouter';
import matchRouter from './matchRouter';
import teamRouter from './teamRouter';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;
