import request from 'supertest';
import { app } from '../../app';
import { v4 as randomUUID } from 'uuid';
import { API_PREFIX } from '../../utils/constants';
import { getRepository } from 'typeorm';
import { User } from '../../entity/user';

const getUserDto = (args?: any) => {
  return {
    addressId: randomUUID(),
    anrede:  args?.anrede || 'HERR',
    titel: 'PROF_DR',
    vorname: 'Max',
    nachname: 'Mustermann',
    geburtsdatum: args?.geburtsdatum || '20.01.1980',
    telefonnummer: '0152489430590',
    email: args?.email || 'max.muster@gmail.com',
    password:  args?.password || 'randomPassword',
    iban: 'DE11111111111111111111',
    kontoInhaber: 'Peter Lustig',
    rabattCode: '12234',
    empfehlung: 'Freund',
    zaehlerdaten: args?.zaehlerdaten || getZaehlerdaten(),
  }
}

const getZaehlerdaten = (args?: any) => {
  return {
    type: args?.type || 'ANBIETERWECHSEL',
    zaehlernummer: 'sdfhJHK349jHJ',
    bisherigerAnbieter: args?.bisherigerAnbieter || 'eon',
    bereitsGekuendigt:  args?.bereitsGekuendigt || false,
    vertragslaufzeitBis: new Date()
  }
}

describe('signup validation related tests', () => {

  it('will create new User and return access and refresh token', async () => {

    const { body } = await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto())
      .expect(201);

    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();
  });
  
  it('will not accept invalid Zaehlerdaten', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ zaehlerdaten: {} }))
      .expect(400)
  
  });
  
  it('will not accept invalid Zaehlerdaten', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ zaehlerdaten: getZaehlerdaten({ type: 'INVALID_TYPE' }) }))
      .expect(400)
  
  });
  
  it('will not accept password with less than 4 chars', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ password: 'jdd' }))
      .expect(400)
  
  });
  
  it('will not accept invalid birthdate format', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ geburtsdatum: '12/23/1980' }))
      .expect(400)
  
  });
  
  it('will not accept invalid email', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ email: 'pete.fake.com' }))
      .expect(400)
  
  });
  
  it('will not accept invalid Anrede', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ anrede: 'MR' }))
      .expect(400)
  
  });
  
  it('will not accept zaehlerdaten with invalid properties', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ zaehlerdaten: getZaehlerdaten({ bereitsGekuendigt: 'not valid' }) }))
      .expect(400)
  
  });
  
  it('will not accept zaehlerdaten with missing properties', async () => {
    await request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserDto({ zaehlerdaten: { type: 'NEUEINZUG', zaehlernummer: 'sdfhjsdfhsjkdfhsdkj' } }))
      .expect(400)
  
  });
});

describe('mocked implementation of db', () => {
  it('will return 500 when connection to database failed', async () => {
    const saveMock = jest.spyOn(getRepository(User), 'save');
    saveMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject('mock implementaion');
      });
    });

    const findOneMock = jest.spyOn(getRepository(User), 'findOne');
    findOneMock.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(undefined);
      }); 
    });

    const { body } = await request(app)
    .post(`${API_PREFIX}/signup`)
    .send(getUserDto())
    .expect(500);

    expect(saveMock).toHaveBeenCalled();
    expect(findOneMock).toHaveBeenCalled();
  });
  
});