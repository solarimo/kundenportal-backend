import { Router, Request, Response } from 'express';
import { UserDto, Anbieterwechsel, Neueinzug, Anrede, ZaehlerDaten } from '../domain/user';
import { validateRequest } from '../middleware/validate-request';
import { API_PREFIX } from '../utils/constants';


const router = Router();

router.post(
  `${API_PREFIX}/register`,
  validateRequest<UserDto>(UserDto),
 (req: Request, res: Response) => {
  const userDto: UserDto = res.locals.input;
  console.log(userDto.zaehlerdaten instanceof ZaehlerDaten);
  
  res.send(userDto);
});

export { router as registerRouter };