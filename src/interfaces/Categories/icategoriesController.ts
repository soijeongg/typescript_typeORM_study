import { Request, Response, NextFunction } from 'express';

export interface IcatergoriesController {
  createCatergoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;

  updateCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;

  getCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;

  deleteCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;

  getAllCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;
}
