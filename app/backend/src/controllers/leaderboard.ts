import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard';

export default class LeaderboardController {
  public service;

  constructor() {
    this.service = new LeaderboardService();
  }

  public async getAllHomeTeams(_req: Request, res: Response) {
    const allHomeTeams = await this.service.getAllHomeTeams();
    return res.status(200).send(allHomeTeams);
  }
}
