import { Request, Response, NextFunction } from 'express';
import verfiyJWT from './verfiyJWT';

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    // 사용자가 이미 로그인되어 있는 경우
    return res.status(403).json({ error: '이미 로그인된 상태입니다.' });
  }
  next();
};
export default checkLogin;
