import { compareSync } from 'bcryptjs';
import ErrorHandle from '../Middleware/Class/error';
import ILogin from '../Interfaces/ILogin';
import LoginModel from '../Models/Login.model';
import { generateJWTToken } from '../Utils/JWT';

class LoginService {
  private model: LoginModel;

  constructor() {
    this.model = new LoginModel();
  }

  public async authenticate({ email, password }: ILogin): Promise<string> {
    const authResult = await this.model.findOneUser(email);
    console.log(authResult);
    if (!authResult) throw new ErrorHandle(400, 'Incorrect email or password');
    const verifyPassword = compareSync(password, authResult.password);
    if (!verifyPassword) throw new ErrorHandle(400, 'Incorrect email or password');

    return generateJWTToken(authResult);
  }
}

export default LoginService;
