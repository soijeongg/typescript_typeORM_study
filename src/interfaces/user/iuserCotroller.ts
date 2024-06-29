import { Request, Response, NextFunction } from 'express';

export interface IuserController {
  signupController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  updateUsercontroller(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;

  deleteUsercontroller(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;

  getUserIdController(req: Request, res: Response): Promise<Response>;

  getAlluserController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;
}
