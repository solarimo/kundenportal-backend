import request from 'supertest';
import { app } from '../../app';
import { v4 as randomUUID } from 'uuid';
import { API_PREFIX } from '../../utils/constants';

const getValidUserDto = () => {
  return {
    addressId: randomUUID(),
    anrede: 'HERR',
    titel: 'PROF_DR',
    vorname: 'Max',
    nachname: 'Mustermann',
    geburtsdatum: '20.01.1980',
    telefonnummer: '0152489430590',
    email: 'max.muster@gmail.com',
    password: 'randomPassword',
    iban: 'DE11111111111111111111',
    rabattCode: '12234',
    empfehlung: 'Freund',
    zaehlerdaten: getValidAnbieterwechsel(),
  }
}

const getValidAnbieterwechsel = () => {
  return {
    type: 'ANBIETERWECHSEL',
    zaehlernummer: 'sdfhJHK349jHJ',
    bisherigerAnbieter: 'eon',
    bereitsGekuendigt: false,
    vertragslaufzeitBis: new Date()
  }
}

it('will not throw errors when Json is valid', async () => {
  
  const response = await request(app)
    .post(`${API_PREFIX}/register`)
    .send(getValidUserDto())
    .expect(200)

  
});