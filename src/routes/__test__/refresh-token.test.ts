import request from 'supertest';
import { getRepository } from 'typeorm';
import { app } from '../../app';
import { RefreshToken } from '../../entity/refresh-token';
import { API_PREFIX } from '../../utils/constants';
import { getUserDto } from './utils';

let refreshToken: string;

beforeAll( async () => {
  //create new user
  const { body } = await request(app)
  .post(`${API_PREFIX}/signup`)
  .send(getUserDto({ email: 'refresh@test.com' }))
  .expect(201);

  refreshToken = body.refreshToken;
});


it('should get new access token', async () => {

  const { body: refreshBody } = await request(app)
    .post(`${API_PREFIX}/refresh-token`)
    .send({ refreshToken })
    .expect(200);

  expect(refreshBody.accessToken).toBeDefined();
});

it('should throw 400 expired token', async () => {

  // resetting expiration date
  const tokenEntity = await getRepository(RefreshToken).findOne({ where: { token: refreshToken } });
  tokenEntity!.expDate = new Date('2000-01-01');
  await getRepository(RefreshToken).save(tokenEntity!);

  await request(app)
    .post(`${API_PREFIX}/refresh-token`)
    .send({ refreshToken })
    .expect(400);

  const shouldBeDeleted = await getRepository(RefreshToken).findOne({ where: { token: refreshToken } });
  expect(shouldBeDeleted).toBeUndefined();
});

it('should throw 400 with invalid token', async () => {

  refreshToken = '38475893f4u39';

  await request(app)
    .post(`${API_PREFIX}/refresh-token`)
    .send({ refreshToken })
    .expect(400);
});