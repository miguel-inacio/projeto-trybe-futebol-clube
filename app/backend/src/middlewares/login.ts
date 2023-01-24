import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JWT from '../auth/jwtFunctions';

const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  next();
};

const validateCredential = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Unauthorized user' });

  const jwt = new JWT();
  const userData = jwt.verifyToken(authorization) as JwtPayload;
  if (userData.isError) {
    return res.status(400).json({ message: userData.isError });
  }
  req.body.user = userData;

  next();
};

export { validateLoginBody, validateCredential };
