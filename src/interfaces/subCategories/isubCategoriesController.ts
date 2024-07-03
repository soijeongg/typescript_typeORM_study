import { Request, Response, NextFunction } from 'express';

export interface ISubCategoriesController {
  createSubCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  updateSubCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  deleteSubCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  getAllSubCatergoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  getIdSubcategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
}
