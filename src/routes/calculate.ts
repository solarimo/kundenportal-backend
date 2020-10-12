import { Router, Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { CalculateRequestDto } from '../domain/calculate-request';
import { CalculationAngebotDto } from '../domain/calculation-angebot';
import { Address } from '../entity/address';
import { NotFoundError } from '../errors/not-found-error';
import { validateRequest } from '../middleware/validate-request';
import { calcualteErspparnisC02, calculateByStromverbrauch, calculateErsparnisYear } from '../services/calculate';
import { API_PREFIX } from '../utils/constants';

const router = Router();

router.post(
  `${API_PREFIX}/register/calculate`,
  validateRequest<CalculateRequestDto>(CalculateRequestDto),
  async (
    req: Request,
    res: Response
  ) => {

    const { stromverbrauch, addressId }: CalculateRequestDto = res.locals.input;

    const addr: Address | undefined = await getRepository(Address).findOne(addressId, { relations: ['projectPrice'] });

    if (!addr) {
      throw new NotFoundError();
    }

    const monatlAbschlag = calculateByStromverbrauch(stromverbrauch, addr.projectPrice.grundpreis, addr.projectPrice.arbeitspreis);
    const monatlAbschlagGv = calculateByStromverbrauch(stromverbrauch, addr.projectPrice.grundpreisGv, addr.projectPrice.arbeitspreisGv);

    const dto: CalculationAngebotDto = {
      grundpreis: addr.projectPrice.grundpreis,
      arbeitspreis: addr.projectPrice.arbeitspreis,
      monatlAbschlag,
      ersparnisPerYear: calculateErsparnisYear(monatlAbschlagGv, monatlAbschlag),
      stromverbrauch,
      ersparnisC02Kg: calcualteErspparnisC02(stromverbrauch)
    }

    res.send(dto);
  }
)


export { router as calculateRouter };