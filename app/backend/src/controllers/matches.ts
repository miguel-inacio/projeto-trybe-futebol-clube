import { Request, Response } from 'express';
import MatchesService from '../services/matches';

export default class MatchesController {
  public service;

  constructor() {
    this.service = new MatchesService();
  }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await this.service.getAllMatches(inProgress as string);
    return res.status(200).send(allMatches);
  }

  public async addMatchInProgress(req: Request, res: Response) {
    const matchData = req.body;
    const newMatch = await this.service.addMatchInProgress(matchData);

    if (newMatch.message) return res.status(404).send(newMatch);

    return res.status(201).send(newMatch);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.finishMatch(id);
    return res.status(200).json(result);
  }

  public async updateMatchScore(req: Request, res: Response) {
    const { id } = req.params;
    const newScore = req.body;
    const result = await this.service.updateScore(id, newScore);
    return res.status(200).json(result);
  }
}
