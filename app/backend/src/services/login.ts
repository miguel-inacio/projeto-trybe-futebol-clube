import bcrypt = require('bcryptjs');
import JWT from '../auth/jwtFunctions';
import User from '../database/models/User';
import ILoginService from './interfaces/ILoginService';
import { TUser } from './interfaces/TUser';

export default class LoginService implements ILoginService {
  public model = User;
  public jwt;

  constructor() {
    this.jwt = new JWT();
  }

  public async userLogin(userLoginData: TUser): Promise<string | null> {
    const { email, password } = userLoginData;
    const user = await this.model.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { role, username } = user;
      const token = this.jwt.createToken({ username, role });
      return token;
    }
    return null;
  }

  public async getUserByEmail(userData: TUser) {
    const { email } = userData;
    const user = await this.model.findOne({ where: { email } });
    return { role: user?.role };
  }
}
