import bcrypt = require('bcryptjs');
import JWT from '../auth/jwtFunctions';
import User from '../database/models/User';
import { TUser } from './interfaces/TUser';
import { TError } from './interfaces/TError';
import ILoginService from './interfaces/ILoginService';

export default class LoginService implements ILoginService {
  public model = User;
  public jwt;

  constructor() {
    this.jwt = new JWT();
  }

  public async userLogin(userLoginData: TUser): Promise<string | TError> {
    const { email, password } = userLoginData;
    const user = await this.model.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { role, username } = user;
      const token = this.jwt.createToken({ username, role });
      return token;
    }
    throw new Error('Email ou senha inválidos!');
  }
}
