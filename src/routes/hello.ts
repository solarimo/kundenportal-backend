import { Router, Request, Response } from 'express';
import { UserDto } from '../domain/user';
import { validateRequest } from '../middleware/validate-request';
import { API_PREFIX } from '../utils/constants';


const router = Router();

router.get(
  `${API_PREFIX}/hello`, (req: Request, res: Response) => {
  res.send('Hi from register');
});

export { router as helloRouter };