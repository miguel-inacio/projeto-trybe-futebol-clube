import { Request, Response } from 'express';
import TeamsService from '../services/teams';

export default class TeamsController {
  public service;

  constructor() {
    this.service = new TeamsService();
  }

  public async getAllTeams(req: Request, res: Response) {
    try {
      const allTeams = await this.service.getAllTeams();
      return res.status(200).send(allTeams);
    } catch (error) {
      console.log(error);
    }
  }

  public async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(id);
      return res.status(200).send(team);
    } catch (error) {
      console.log(error);
    }
  }
}
