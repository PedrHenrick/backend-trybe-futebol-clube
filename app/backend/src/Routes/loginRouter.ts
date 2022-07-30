import { Router } from 'express';
import validateMiddleware from '../Middleware/validate.middleware';
import loginSchema from '../Middleware/schemes';
import LoginController from '../Controllers/Login.controller';
import authenticateMiddleware from '../Middleware/auth.middleware';

const loginRouter = Router();
loginRouter.post('/', validateMiddleware(loginSchema), new LoginController().verifyLogin);
loginRouter.get('/validate', authenticateMiddleware, new LoginController().validate);

export default loginRouter;
