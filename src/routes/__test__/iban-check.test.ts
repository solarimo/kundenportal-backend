import request from 'supertest';
import { app } from '../../app';
import { IbanResponseDto } from '../../domain/iban';
import { API_PREFIX } from '../../utils/constants';

const testIBAN = 'DE89370400440532013000';
const invalidIBAN = 'DE89370400440532013001';

it('will make the request and return valid plus bic with valid iban', async () => {
  const { body }: { body: IbanResponseDto } = await request(app)
    .post(`${API_PREFIX}/register/validate-iban`)
    .send({
      iban: testIBAN
    })
    expect(200);

  expect(body.valid).toEqual(true);

    
});

it('will not return true and won\'t send a bic when receiving invalid iban', async () => {
  const { body } = await request(app)
  .post(`${API_PREFIX}/register/validate-iban`)
  .send({
    iban: invalidIBAN
  })
  .expect(200)

expect(body.valid).toEqual(false);
});