import * as bcrypt from 'bcryptjs';
import ErrorHandle from '../Middleware/Class/error';
import ILogin from '../Interfaces/ILogin';
import LoginModel from '../Models/Login.model';
import { generateJWTToken } from '../Utils/JWT';

export default class LoginService {
  public authenticate = async ({ email, password }: ILogin): Promise<string> => {
    const authResult = await new LoginModel().findOneUser(email);

    if (!authResult) throw new ErrorHandle(401, 'Incorrect email or password');
    const verifyPassword = bcrypt.compareSync(password, authResult.password);
    if (!verifyPassword) throw new ErrorHandle(401, 'Incorrect email or password');

    const user = {
      username: authResult.username,
      email: authResult.email,
      role: authResult.role,
    };

    return generateJWTToken(user);
  };
}
