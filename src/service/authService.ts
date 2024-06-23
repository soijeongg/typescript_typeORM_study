import { createUserDTO } from '../DTO';
import { authRepostiory } from '../respository';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export class authService {
  private AuthRepository: authRepostiory;

  constructor() {
    this.AuthRepository = new authRepostiory();
  }
  public async login(email: string, password: string): Promise<string | null> {
    const user = await this.AuthRepository.findByEmail(email);
    if (user && (await argon2.verify(user.password, password))) {
      const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
        expiresIn: '1h',
      });
      return token;
    }
    return null;
  }
}
