import request from 'supertest';
import { app } from '../../app';
import { API_PREFIX } from '../../utils/constants';
import { v4 as uuid } from 'uuid';
import { getUserDto } from './utils';


it('should signup and successfully logout', async () => {

  const { body: signupBody } = await request(app)
    .post(`${API_PREFIX}/signup`)
    .send(getUserDto({ email: 'discard@test.com' }))
    .expect(201);

  await request(app)
    .post(`${API_PREFIX}/signout`)
    .send({ refreshToken: signupBody.refreshToken })
    .expect(200);
    
    
});

it('should throw 400 when invalid request boody', async () => {

  await request(app)
    .post(`${API_PREFIX}/signout`)
    .send({ refreshToken: 'thisisnotvalid' })
    .expect(400);
    
});


it('should return 404 when refresh token does not exist', async () => {

  await request(app)
    .post(`${API_PREFIX}/signout`)
    .send({ refreshToken: uuid() })
    .expect(404);
    
});