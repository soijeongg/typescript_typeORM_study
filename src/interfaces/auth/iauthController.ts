import { Request, Response, NextFunction } from 'express';

export interface iauthController {
  loginController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
}
