import { NextFunction, Request, Response } from 'express';

const validateMatchTeams = (req: Request, res: Response, next: NextFunction) => {
  const matchData = req.body;
  if (matchData.awayTeamId === matchData.homeTeamId) {
    return res.status(422).send({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  next();
};

const validateToken = '';

export { validateMatchTeams, validateToken };
