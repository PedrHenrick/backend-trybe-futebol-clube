import { Request, Response } from 'express';
import ErrorHandle from '../Middleware/Class/error';
import ILogin from '../Interfaces/ILogin';
import LoginService from '../Services/Login.service';

class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async verifyLogin(request: Request, response: Response) {
    try {
      const authResult = await this.service.authenticate(request.body as ILogin);
      response.status(200).json(authResult);
    } catch (error) {
      console.log(error);
      throw new ErrorHandle(500, 'Internal server error');
    }
  }
}

export default LoginController;
