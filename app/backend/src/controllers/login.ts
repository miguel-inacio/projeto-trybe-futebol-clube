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

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
