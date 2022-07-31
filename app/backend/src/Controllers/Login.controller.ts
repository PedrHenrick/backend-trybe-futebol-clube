import { Request, Response } from 'express';
import { authenticateToken } from '../Utils/JWT';
import ILogin from '../Interfaces/ILogin';
import LoginService from '../Services/Login.service';

class LoginController {
  public verifyLogin = async (request: Request, response: Response): Promise<Response> => {
    const authResult = await new LoginService().authenticate(request.body as ILogin);
    return response.status(200).json({ token: authResult });
  };

  public validate = async (request: Request, response: Response): Promise<Response> => {
    const token = request.headers.authorization || '';
    const userLogged = await authenticateToken(token);
    return response.status(200).json({ role: userLogged.role });
  };
}

export default LoginController;
