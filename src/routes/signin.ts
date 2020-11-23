import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { validateRequest } from '../middleware/validate-request';
import { API_PREFIX } from '../utils/constants';

import { LoginCredentialsDto } from '../domain/login';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';
import { generateAccessToken, generateRefreshToken } from '../services/token';


const router = Router();

router.post(
  `${API_PREFIX}/signin`,
  validateRequest<LoginCredentialsDto>(LoginCredentialsDto),
  async (req: Request, res: Response) => {
  const { email, password }: LoginCredentialsDto = res.locals.input;
  
  // validate Password and email
  const user = await getRepository(User).findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError();
  }
  const valid = bcrypt.compare(password, user.password);
  if (!valid) {
    throw new BadRequestError('Invalid Password');
  } 
  else {
    const accessToken = generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user);

    res.status(200).send({ accessToken, refreshToken });
  }
  
});

export { router as signinRouter };