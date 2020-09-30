import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AddressDto } from '../domain/user-dto';
import { Address } from '../entity/address';
import { Hausnummer } from '../entity/hausnummer';
import { validateRequest } from '../middleware/validate-request';

const router = Router();



router.post(
  '/register/validate-address',
  validateRequest<AddressDto>(AddressDto),
  async (
    req: Request, res: Response
  ) => {
    const dto: AddressDto = res.locals.input; 


    // TODO check against Database entries
    const address: Address | undefined = await getRepository(Address).findOne({ where: {
      strasse: dto.strasse,
      stadt: dto.stadt,
      postleitzahl: dto.postleitzahl
    },
      relations: ["hausnummern"]
    });

    let valid = false;

    if (address) {
      address.hausnummern.forEach(entity => {
        if (entity.nummer === dto.hausnummer) {
          valid = true;
        }
      })
    }

    const body = {
      valid: valid
    }

    res.status(200).send(JSON.stringify(body));
  }
);

export { router as addressCheckRouter };