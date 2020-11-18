import { v4 as uuid } from 'uuid';
import { generateAccessToken, generateRefreshToken } from '../token';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/user';
import { getRepository } from 'typeorm';
import { RefreshToken } from '../../entity/refresh-token';

it('should return jwt access token', () => {
  const userId = uuid();

  const token = generateAccessToken(userId);
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
  expect(payload.userId).toEqual(userId);

});

it('should generate token with proper expiry date', async () => {
  const user = new User();
  user.email = 'test@test.com';
  user.password = 'password';

  const savedUser = await getRepository(User).save(user);

  const token = await generateRefreshToken(savedUser);

  const retrievedToken = await getRepository(RefreshToken)
    .findOne({ where: { token: token }, relations: ['user'] })
  
  
  expect(retrievedToken!.token).toEqual(token);
  expect(retrievedToken!.user.id).toEqual(savedUser.id);
  expect(retrievedToken!.expDate.getTime()).toBeGreaterThan(Date.now());
  
});

