import passport from 'passport';
import argon2 from 'argon2';
import { getRepository } from 'typeorm';
import passportJwt from 'passport-jwt';
import { User } from '../entities/user';
import * as dotenv from 'dotenv'
import path  from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const secretOrKey = process.env.JWT_SECRET;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT를 추출하는 방법을 정의
  secretOrKey: process.env.JWT_SECRET as string, // JWT를 검증하는 데 사용할 비밀 키
};
interface JwtPayload {
  id: number;
}

const passportConfig = (passport: any) => {
  passport.use(
    new JwtStrategy(
      opts,
      async (
        jwt_payload: JwtPayload,
        done: (error: any, user?: any, info?: any) => void,
      ) => {
        try {
          const userRepository = getRepository(User);
          const user = await userRepository.findOne({
            where: { userId: jwt_payload.id },
          });
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (err) {
          console.error(err);
          return done(err, false);
        }
      },
    ),
  );
};

export default passportConfig;
