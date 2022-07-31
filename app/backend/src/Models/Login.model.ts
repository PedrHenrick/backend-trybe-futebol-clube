import User from '../database/models/user';

export default class LoginModel {
  public findOneUser = (email: string) => User.findOne({ where: { email } });
}
