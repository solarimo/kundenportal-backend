import request from 'supertest';
import { app } from '../../app';
import { API_PREFIX } from '../../utils/constants';

it('will receive a valid address and respond with valid: true', async () => {


  const response = await request(app)
    .post(`${API_PREFIX}/register/validate-address`)
    .send({  
      strasse: 'Musterstrasse',
      hausnummer: '15A',
      postleitzahl: '12345',
      stadt: 'Musterstadt'
    })
    .expect(200)
    
    const { body } = response;
    expect(body.addressId).not.toBeNull();
   
  
});

it('will return errors object if the body fails vaildaton', async () => {


  const response = await request(app)
    .post(`${API_PREFIX}/register/validate-address`)
    .send({  
      strasse: 1,
      hausnummer: '15A',
      // invalid plz
      postleitzahl: '123',
      stadt: 'Musterstadt'
    })
    expect(400)
    
});

it('will receive a invalid address and respond with valid: false', async () => {


  const response = await request(app)
    .post(`${API_PREFIX}/register/validate-address`)
    .send({  
      strasse: 'Musterstras',
      hausnummer: '15A',
      postleitzahl: '12345',
      stadt: 'Musterstadt'
    })
    .expect(200)

    const { body: data } = response;
    expect(data.addressId).toEqual(null);
   
  
});