import User from '../database/models/user';

class LoginModel {
  public findOneUser = (email: string) => User.findOne({ where: { email } });
}

export default LoginModel;
