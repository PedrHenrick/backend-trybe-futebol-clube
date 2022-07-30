import { Router } from 'express';
import validateMiddleware from '../Middleware/validate.middleware';
import loginSchema from '../Middleware/schemes';
import LoginController from '../Controllers/Login.controller';

const loginRouter = Router();
loginRouter.post('/', validateMiddleware(loginSchema), new LoginController().verifyLogin);

export default loginRouter;
