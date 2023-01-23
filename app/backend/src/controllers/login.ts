import { Request, Response } from 'express';
import LoginService from '../services/login';

export default class LoginController {
  public service;

  constructor() {
    this.service = new LoginService();
  }

  public async userLogin(req: Request, res: Response) {
    try {
      const userData = req.body;
      const token = await this.service.userLogin(userData);

      if (!token) return res.status(401).send({ message: 'Incorrect email or password' });

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async getUserRole(req: Request, res: Response) {
    try {
      const { user } = req.body;
      const userRole = await this.service.getUserByEmail(user.email);
      return res.status(200).send(userRole);
    } catch (error) {
      console.log(error);
    }
  }
}
