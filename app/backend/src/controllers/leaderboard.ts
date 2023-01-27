import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard';

export default class LeaderboardController {
  public service;

  constructor() {
    this.service = new LeaderboardService();
  }

  public async getAllTeams(req: Request, res: Response) {
    const pitch = req.path;
    const allHomeTeams = await this.service.getAllTeamsByPitch(pitch);
    return res.status(200).send(allHomeTeams);
  }
}
