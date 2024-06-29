/*
req.header에 있는 토큰을 검증한다
토큰에서 jti를 꺼내오고 이 jti가 엑세스토큰 엔티티에 있는지 검사한다 
그리고 is_Revoked 만료된게 false인지 확인한다 
*/

import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../dataSource';
import { AccessToken } from '../entities';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const JWT_SECRET = process.env.JWT_SECRET as string;

export default async (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return res.status(401).json({ error: '로그인을 먼저 진행해주세요' });
  }
  const decoed = jwt.verify(cookie, JWT_SECRET) as jwt.JwtPayload;
  const jti = decoed.jti;
  const tokenRepository = AppDataSource.getRepository(AccessToken);
  const storedToken = await tokenRepository.findOne({ where: { jti } });

  if (!storedToken || storedToken.isRevoked) {
    return res
      .status(401)
      .json({ error: '토큰이 만료되었거나 토큰이 없습니다' });
  }
  req.user = decoed;
  next();
};
