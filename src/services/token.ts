import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { RefreshToken } from '../entity/refresh-token';
import { User } from '../entity/user';
import { ACCESS_TOKEN_EXPIRY } from '../utils/constants';

export function generateAccessToken(userId: string) {
  const payload = { userId: userId };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export async function generateRefreshToken(user: User) {
  const tokenEntity = new RefreshToken();
  const expDate = new Date();
  expDate.setMonth(expDate.getMonth() + 3);
  tokenEntity.expDate = expDate;
  tokenEntity.user = user;
  await getRepository(RefreshToken).save(tokenEntity);
  return tokenEntity.token;
}