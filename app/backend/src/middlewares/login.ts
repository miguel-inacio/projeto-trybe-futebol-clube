import { NextFunction, Request, Response } from 'express';

const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  next();
};

const validateData = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);

  if (!emailRegex || password.length < 6) {
    return res.status(401).send({ message: 'Incorrect email or password' });
  }

  next();
};

export { validateLoginBody, validateData };
