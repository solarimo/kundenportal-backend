import { Router, Request, Response } from 'express';
import { UserDto } from '../domain/user';
import { User } from '../entity/user';
import { validateRequest } from '../middleware/validate-request';
import { API_PREFIX } from '../utils/constants';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { InternalServerError } from '../errors/internal-server-error';
import { BadRequestError } from '../errors/bad-request-error';
import { generateAccessToken, generateRefreshToken } from '../services/token';


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
  const accessToken = generateAccessToken(savedUser.id);
  const refreshToken = await generateRefreshToken(savedUser);
  // return tokens
  res.status(201).send({ accessToken, refreshToken });
});

export { router as signupRouter };