import jwt = require('jsonwebtoken');
import { TUser } from './types/TUser';

export default class JWT {
  public secret;

  constructor() {
    this.secret = 'jwt_secret';
  }

  public createToken(userData: TUser): string {
    const token = jwt.sign(userData, this.secret, {
      algorithm: 'HS256',
      expiresIn: '10d',
    });
    return token;
  }

  public verifyToken(authorization: string) {
    try {
      const payload = jwt.verify(authorization, this.secret);
      return payload;
    } catch (error) {
      return { isError: true, error };
    }
  }
}
