import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { API_PREFIX } from '../app';
import { AddressDto } from '../domain/user-dto';
import { Address } from '../entity/address';
import { validateRequest } from '../middleware/validate-request';

const router = Router();



router.post(
  `${API_PREFIX}/register/validate-address`,
  validateRequest<AddressDto>(AddressDto),
  async (
    req: Request, res: Response
  ) => {
    const dto: AddressDto = res.locals.input; 

    const address: Address | undefined = await getRepository(Address).findOne({ where: {
      strasse: dto.strasse,
      stadt: dto.stadt,
      postleitzahl: dto.postleitzahl
    },
      relations: ["hausnummern"]
    });


    const body: { addressId: string | null } = { addressId: null };

    if (address) {
      address.hausnummern.forEach(entity => {
        if (entity.nummer === dto.hausnummer) {
          body.addressId = address.id;
        }
      });
      
    }

    res.status(200).send(body);
  }
);

export { router as addressCheckRouter };