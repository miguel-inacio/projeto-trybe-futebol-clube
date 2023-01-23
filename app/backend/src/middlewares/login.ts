import { NextFunction, Request, Response } from 'express';

const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(400).send('Campos inválidos!');

  return next();
};

export default validateLoginBody;
