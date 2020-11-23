import request from 'supertest';
import { app } from '../../app';
import { API_PREFIX } from '../../utils/constants';
import { User } from '../../entity/user';
import { hashPassword } from '../../services/hash';
import { getRepository } from 'typeorm';

it('will sign in valid with valid credentials', async () => {
  const user = new User();
  user.email = 'test@test.com'
  user.password = await hashPassword('password');

  await getRepository(User).save(user);

  const { body } = await request(app)
    .post(`${API_PREFIX}/signin`)
    .send({
      email: user.email,
      password: user.password
    })
    .expect(200);

    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();
});

it('will return 404 if user is not found', async () => {
  await request(app)
    .post(`${API_PREFIX}/signin`)
    .send({
      email: 'other@test.com',
      password: 'random'
    })
    .expect(404);

});

it('will return 400 when email is invalid', async () => {
  await request(app)
    .post(`${API_PREFIX}/signin`)
    .send({
      email: 'invalidtest.com',
      password: 'random'
    })
    .expect(400);

});

it('will return 400 when password is missing', async () => {
  await request(app)
    .post(`${API_PREFIX}/signin`)
    .send({
      email: 'invalidtest.com'
    })
    .expect(400);

});
