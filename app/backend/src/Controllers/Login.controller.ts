import { Request, Response } from 'express';
import ILogin from '../Interfaces/ILogin';
import LoginService from '../Services/Login.service';

class LoginController {
  public verifyLogin = async (request: Request, response: Response) => {
    const authResult = await new LoginService().authenticate(request.body as ILogin);
    response.status(200).json({ token: authResult });
  };
}

export default LoginController;
