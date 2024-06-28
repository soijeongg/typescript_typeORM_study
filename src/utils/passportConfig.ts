import passport from 'passport';
import argon2 from 'argon2';
import passportJwt from 'passport-jwt';
import { AppDataSource } from '../dataSource';
import { User } from '../entities/user';
import * as dotenv from 'dotenv';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT를 추출하는 방법을 정의
  secretOrKey: process.env.JWT_SECRET as string, // JWT를 검증하는 데 사용할 비밀 키
};
interface JwtPayload {
  id: number;
}
const passportConfig = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
          }
          const isMatch = await argon2.verify(user.password, password);
          if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    new JwtStrategy(opts, async (jwtPayload: JwtPayload, done) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
          where: { userId: jwtPayload.id },
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};
export default passportConfig;
