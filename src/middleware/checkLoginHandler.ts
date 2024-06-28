import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUser } from '../interfaces/user/iuser';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }
      if (user) {
        // 사용자가 이미 로그인되어 있는 경우
        return res.status(403).json({ error: '이미 로그인된 상태입니다.' });
      }
      // 로그인되어 있지 않은 경우, 다음 미들웨어로 이동
      next();
    },
  )(req, res, next);
};
