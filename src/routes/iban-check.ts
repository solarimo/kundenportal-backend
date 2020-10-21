import { Router, Response, Request } from 'express';  
import { IbanDto, IbanResponseDto, OpenIbanResponseDto } from '../domain/iban';
import { validateRequest } from '../middleware/validate-request';
import { API_PREFIX } from '../utils/constants';
import httpClient from 'axios';


const router = Router();
const openIBANUrl = (iban: string) => `https://openiban.com/validate/${iban}?getBIC=true&validateBankCode=true`;

router.post(
  `${API_PREFIX}/register/validate-iban`,
  validateRequest<IbanDto>(IbanDto),
  async (
    req: Request, res: Response
  ) => {
    const dto: IbanDto = res.locals.input;
    const { data } = await httpClient.get<OpenIbanResponseDto>(openIBANUrl(dto.iban));
    const resDto: IbanResponseDto = {
      valid: data.valid,
      bic: data.valid ? data.bankData.bic : undefined
    }
    res.send(resDto);
  }
);

export { router as ibanCheckRouter };