import { Router, Request, Response } from 'express';
import { AddressDto } from '../domain/user-dto';
import { validateRequest } from '../middleware/validate-request';

const router = Router();



router.post(
  '/register/validate-address',
  validateRequest<AddressDto>(AddressDto),
  (
    req: Request, res: Response
  ) => {
    const address: AddressDto = res.locals.input; 
    // TODO check against Database entries

    const body = {
      valid: true
    }

    res.status(200).send(JSON.stringify(body));
  }
);

export { router as addressCheckRouter };