import { Request, Response } from 'express';
import MatchesService from '../services/matches';

export default class MatchesController {
  public service;

  constructor() {
    this.service = new MatchesService();
  }

  public async getAllMatches(req: Request, res: Response) {
    try {
      const allMatches = await this.service.getAllMatches();
      return res.status(200).send(allMatches);
    } catch (error) {
      console.log(error);
    }
  }
}
