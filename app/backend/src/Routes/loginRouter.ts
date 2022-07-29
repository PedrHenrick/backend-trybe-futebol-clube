import { Router } from 'express';
import LoginController from '../Controllers/Login.controller';

const loginRouter = Router();
loginRouter.post('/', new LoginController().verifyLogin);

export default loginRouter;
