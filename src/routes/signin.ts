import { Router, Request, Response } from 'express';

import { validateRequest } from '../middleware/validate-request';
import { ACCESS_TOKEN_EXPIRY, API_PREFIX, REFRESH_TOKEN_EXPIRY } from '../utils/constants';

import { LoginCredentialsDto } from '../domain/login';


const router = Router();

router.post(
  `${API_PREFIX}/signin`,
  validateRequest<LoginCredentialsDto>(LoginCredentialsDto),
  async (req: Request, res: Response) => {
  const loginCredentials: LoginCredentialsDto = res.locals.input;
  
  // validate Password and email

  // create new Access and Refresh Token

  // return Tokens
  
});

export { router as signinRouter };