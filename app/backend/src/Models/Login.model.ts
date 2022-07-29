import IUSer from '../Interfaces/IUser';
import User from '../database/models/user';

class LoginModel {
  private email!: string;

  public async findOneUser(email: string): Promise<IUSer> {
    this.email = email;
    const user = await User.findOne({ where: { email } });
    return user as IUSer;
  }
}

export default LoginModel;
