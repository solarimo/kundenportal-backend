import { Expose } from 'class-transformer';
import { IsDefined, Length } from 'class-validator';
import { Router, Request, Response } from 'express';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

class AddressDto {

  @IsDefined()
  @Expose()
  strasse: string;

  @IsDefined()
  @Expose()
  hausnummer: string;

  @IsDefined()
  @Expose()
  postleitzahl: number;

  @IsDefined()
  @Expose()
  stadt: string;

  constructor(
    strasse: string,
    hausnummer: string,
    postleitzahl: number,
    stadt: string
  ) {
    this.strasse = strasse;
    this.hausnummer = hausnummer;
    this.postleitzahl = postleitzahl;
    this.stadt = stadt;
  }
}

router.post(
  '/register/validate-address',
  validateRequest<AddressDto>(AddressDto),
  (req: Request, res: Response) => {
  const address: AddressDto = res.locals.input; 
  res.send(JSON.stringify(address));
});

export { router as addressCheckRouter };