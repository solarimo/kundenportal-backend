import { Router, Request, Response } from 'express';
import { UserDto } from '../domain/user';
import { User } from '../entity/user';
import { validateRequest } from '../middleware/validate-request';
import { ACCESS_TOKEN_EXPIRY, API_PREFIX, REFRESH_TOKEN_EXPIRY } from '../utils/constants';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { InternalServerError } from '../errors/internal-server-error';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';


const router = Router();

router.post(
  `${API_PREFIX}/signup`,
  validateRequest<UserDto>(UserDto),
  async (req: Request, res: Response) => {
  const userDto: UserDto = res.locals.input;

  // check if user exists already
  const existingUser = await getRepository(User).findOne({ where: { 'email': userDto.email } });

  if(existingUser) {
    throw new BadRequestError('Email taken');
  }
  
  // hash password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(userDto.password, salt);

  // create new User and save it
  const user = new User();
  user.email = userDto.email;
  user.password = passwordHash;

  const savedUser = await getRepository(User).save(user).catch((e: Error) => {
    throw new InternalServerError(e.message) 
  });

  // generate access and refresh token
  const payload = { userId: savedUser.id };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: REFRESH_TOKEN_EXPIRY });

  // return tokens
  res.status(201).send({ accessToken, refreshToken });
});

export { router as signupRouter };