import { Request, Response, NextFunction } from 'express';

export interface IcatergoriesController {
  createCatergoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  updateCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  getCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  deleteCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  getAllCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
}
