import { Request, Response, NextFunction } from 'express';
import { authService } from '../service/authService';
import { createUserDTO } from '../DTO';
import { iauthController } from '../interfaces/auth/iauthController';
import passport from 'passport';
import { IUser } from '../interfaces/user/iuser';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const JWT_SECRET = process.env.JWT_SECRET as string;
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

          const token = jwt.sign({ id: user.userId }, JWT_SECRET, {
            expiresIn: '1h',
          });
          res.cookie('jwt', token);
          return res
            .status(200)
            .json({ message: '로그인에 성공하였습니다.', token });
        } catch (error) {
          return next(error);
        }
      },
    )(req, res, next);
  }
}
