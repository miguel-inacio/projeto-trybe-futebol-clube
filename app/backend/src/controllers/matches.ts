import { Request, Response } from 'express';
import MatchesService from '../services/matches';

export default class MatchesController {
  public service;

  constructor() {
    this.service = new MatchesService();
  }

  public async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const allMatches = await this.service.getAllMatches(inProgress as string);
      return res.status(200).send(allMatches);
    } catch (error) {
      console.log(error);
    }
  }

  public async addMatchInProgress(req: Request, res: Response) {
    try {
      const matchData = req.body;
      const newMatch = await this.service.addMatchInProgress(matchData);
      return res.status(201).send(newMatch);
    } catch (error) {
      console.log(error);
    }
  }

  public async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.service.finishMatch(id);
      if (result) return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
