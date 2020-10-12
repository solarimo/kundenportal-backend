import request from 'supertest';
import { app } from '../../app';
import { v4 as randomUUID } from 'uuid';
import { API_PREFIX } from '../../utils/constants';

const getValidUserJson = () => {
  return `{
    "addressId": "${randomUUID()}",
    "anrede": "HERR",
    "titel": "DR",
    "vorname": "Max",
    "nachname": "Mustermann",
    "geburtsdatum": "20.01.1980",
    "telefonnummer": "0152489430590",
    "email": "max.muster@gmail.com"
  }`
}

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
    zaehlerdaten: {}
  }
}

const getValidAnbieterwechsel = () => {
  return {
    __type: 'ANBIETERWECHSEL',
    reason: 'ANBIETERWECHSEL',
    zaehlernummer: 'sdfhJHK349jHJ',
    bisherigerAnbieter: 'eon',
    bereitsGekuendigt: false,
    vertragslaufzeitBis: new Date()
  }
}

it('will not throw errors', async () => {
  
  const response = await request(app)
    .post(`${API_PREFIX}/register`)
    .send(getValidUserDto())

  console.log(response.body);
  
});