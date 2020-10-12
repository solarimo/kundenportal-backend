import request from 'supertest';
import { getRepository } from 'typeorm';
import { app } from '../../app';
import { Address } from '../../entity/address';
import { v4 as randomUUID } from 'uuid';
import { API_PREFIX } from '../../utils/constants';


it('will return 400 when request body is in valid', async () => {

  await request(app)
    .post(`${API_PREFIX}/register/calculate`)
    .send({
      addressId: "0ee61308-63da-4217-a363-e5763b2afddd",
      stromverbrauch: "should be number"
    })
    .expect(400)
});

it('will return 400 when request body has missing property', async () => {

  await request(app)
    .post(`${API_PREFIX}/register/calculate`)
    .send({
      stromverbrauch: 4000
    })
    .expect(400)
});

it('will return 200 when address exists', async () => {

  const addr: Address | undefined = await getRepository(Address).findOne();
  

  await request(app)
    .post(`${API_PREFIX}/register/calculate`)
    .send({
      addressId: addr!.id,
      stromverbrauch: 4000
    })
    .expect(200)
});

it('will return 404 when address does not exist', async () => {

  

  await request(app)
    .post(`${API_PREFIX}/register/calculate`)
    .send({
      addressId: randomUUID(),
      stromverbrauch: 4000
    })
    .expect(404)
});