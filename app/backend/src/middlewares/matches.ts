import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JWT from '../auth/jwtFunctions';

const validateMatchTeams = (req: Request, res: Response, next: NextFunction) => {
  const matchData = req.body;
  if (matchData.awayTeamId === matchData.homeTeamId) {
    return res.status(422).send({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  next();
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Unauthorized user' });

  const jwt = new JWT();
  const userData = jwt.verifyToken(authorization) as JwtPayload;
  if (userData.isError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export { validateMatchTeams, validateToken };
