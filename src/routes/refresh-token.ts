import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { RefreshTokenDto } from '../domain/login';
import { RefreshToken } from '../entity/refresh-token';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { generateAccessToken } from '../services/token';
import { API_PREFIX } from '../utils/constants';



const router = Router();

router.post(
  `${API_PREFIX}/refresh-token`,
  validateRequest<RefreshTokenDto>(RefreshTokenDto),
  async (req: Request, res: Response) => {
  const { refreshToken }: RefreshTokenDto = res.locals.input;
  
  const tokenEntity = await getRepository(RefreshToken).findOne({ where: { token: refreshToken } });

  if (!tokenEntity) throw new BadRequestError('Token expired');

  // check whether expired
  const now = new Date();
  
  if(tokenEntity.expDate < now) {
    await getRepository(RefreshToken).remove(tokenEntity);
    throw new BadRequestError('Token expired');
  }

  const accessToken = generateAccessToken(tokenEntity.id);

  return res.send({ accessToken });
  
  
});

export { router as refreshTokenRouter };