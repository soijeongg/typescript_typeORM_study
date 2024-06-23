import { Request, Response, NextFunction } from 'express';
import { authService } from '../service/authService';
import { createUserDTO } from '../DTO';

export class AuthController {
  private AuthService: authService;
  constructor(AuthService: authService) {
    this.AuthService = AuthService;
    this.login = this.login.bind(this);
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const token = await this.AuthService.login(email, password);
      if (!token) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
      return;
    }
  }
}
