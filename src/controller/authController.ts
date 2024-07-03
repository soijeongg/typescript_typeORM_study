import { Request, Response, NextFunction } from 'express';
import { authService } from '../service/authService';
import { iauthController } from '../interfaces/auth/iauthController';
import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';
import { AccessToken, RefreshToken } from '../entities';
import { IUser } from '../interfaces/user/iuser';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';
import { AppDataSource } from '../dataSource';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
export class AuthController implements iauthController {
  private AuthService: authService;
  constructor(AuthService: authService) {
    this.AuthService = AuthService;
    this.loginController = this.loginController.bind(this);
  }
  public async loginController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    passport.authenticate(
      'local',
      async (err: Error, user: IUser, info: any) => {
        try {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).json({ message: info.message });
          }
          const jti = uuidv4(); //토큰의 고유한 식별자
          const token = jwt.sign({ id: user.userId, jti }, JWT_SECRET, {
            expiresIn: '1h', //만료시간
          });
          const refreshToken = jwt.sign(
            { id: user.userId, jti },
            JWT_REFRESH_SECRET,
            {
              expiresIn: '7d',
            },
          );
          res.cookie('jwt', token, {
            // httpOnly: true,
            //secure: process.env.NODE_ENV === 'production', // production 환경에서만 secure 속성 사용
            maxAge: 3600000, // 1시간
          });
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          // 토큰을 데이터베이스에 저장 -> 엑세스토큰 데이터베이스 만들어선
          const expirationDate = new Date(Date.now() + 3600000);
          const RefreshExpiration = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          );
          const createdAt = new Date();
          const tokenRepository = AppDataSource.getRepository(AccessToken);
          const refreshRepository = AppDataSource.getRepository(RefreshToken);
          const newAccessToken = tokenRepository.create({
            jti,
            createdAt,
            isRevoked: false,
            expirationDate,
            user,
          });
          await tokenRepository.save(newAccessToken);

          const newRefreshToken = refreshRepository.create({
            jti,
            createdAt,
            isRevoked: false,
            expirationDate: RefreshExpiration,
            user,
          });
          await refreshRepository.save(newRefreshToken);
          return res
            .status(200)
            .json({ message: '로그인에 성공하였습니다.', token });
        } catch (error) {
          return next(error);
        }
      },
    )(req, res, next);
  }
  public async logOutController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: '로그인 상태가 아닙니다.' });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const jti = decoded.jti;

    // 토큰 무효화
    const tokenRepository = AppDataSource.getRepository(AccessToken);
    const refreshRepository = AppDataSource.getRepository(RefreshToken);
    const storedToken = await tokenRepository.findOne({ where: { jti } });
    const RedreshstoredToken = await tokenRepository.findOne({
      where: { jti },
    });

    if (storedToken) {
      storedToken.isRevoked = true;
      await tokenRepository.save(storedToken);
    }
    if (RedreshstoredToken) {
      RedreshstoredToken.isRevoked = true;
      await refreshRepository.save(RedreshstoredToken);
    }
    res.clearCookie('jwt');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: '로그아웃에 성공하였습니다.' });
  }
}
