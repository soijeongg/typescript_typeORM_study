import { Request, Response } from 'express';

export interface IuserController {
  signupController(req: Request, res: Response): Promise<Response>;
}
