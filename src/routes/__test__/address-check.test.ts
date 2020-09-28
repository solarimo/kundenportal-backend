import request from 'supertest';
import { app } from '../../app';

it('will receive a valid address', async () => {
  const response = await request(app)
    .post('/register/validate-address')
    .send({  
      strasse: 'Musterstrasse',
      hausnummer: '15A',
      postleitzahl: 12345,
      stadt: 'Musterstadt'
    })
    console.log(response.text);
    
   expect(200);
   
   

  
})