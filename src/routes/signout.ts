import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { RefreshTokenDto } from '../domain/login';
import { RefreshToken } from '../entity/refresh-token';
import { NotFoundError } from '../errors/not-found-error';
import { validateRequest } from '../middleware/validate-request';
import { API_PREFIX } from '../utils/constants';



const router = Router();

router.post(
  `${API_PREFIX}/signout`,
  validateRequest<RefreshTokenDto>(RefreshTokenDto),
  async (req: Request, res: Response) => {
  const { refreshToken }: RefreshTokenDto = res.locals.input;
  
  const result = await getRepository(RefreshToken).delete({ token: refreshToken });
  if (!result.affected || result.affected < 1) {
    throw new NotFoundError();
  }
    

  return res.send({ success: 'user signed out' })
  
  
});

export { router as signoutRouter };