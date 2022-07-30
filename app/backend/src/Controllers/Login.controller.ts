import { Request, Response } from 'express';
import { authenticateToken } from '../Utils/JWT';
import ILogin from '../Interfaces/ILogin';
import LoginService from '../Services/Login.service';

class LoginController {
  public verifyLogin = async (request: Request, response: Response) => {
    const authResult = await new LoginService().authenticate(request.body as ILogin);
    response.status(200).json({ token: authResult });
  };

  public validate = async (request: Request, response: Response) => {
    const token = request.headers.authorization || '';
    const userLogged = await authenticateToken(token);
    response.status(200).json({ role: userLogged.role });
  };
}

export default LoginController;
