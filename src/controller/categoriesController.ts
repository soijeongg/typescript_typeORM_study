import { Request, Response, NextFunction } from 'express';
import { IcatergoriesController } from '../interfaces/Categories/icategoriesController';
import { categoriesService } from "../service/categoriesService";
import { createCategoiresDto } from "../DTO/categories/createCategoriesDto";
import { updateCategoriesDTO } from "../DTO/categories/updateCategoriesDto";
import { categoriesDTO } from "../DTO/categories/categoriesDTO";

export class categoriesController implements IcatergoriesController {
  private categoriesService: categoriesService;

  constructor(categoriesService: categoriesService) {
    this.categoriesService = categoriesService;
    this.createCatergoriesController =
      this.createCatergoriesController.bind(this);
    this.deleteCategoriesController =
      this.deleteCategoriesController.bind(this);
    this.getAllCategoriesController =
      this.getAllCategoriesController.bind(this);
    this.getCategoriesController = this.getCategoriesController.bind(this);
    this.updateCategoriesController =
      this.updateCategoriesController.bind(this);
  }
  public async createCatergoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { categoriesName } = req.body;
      const categoriesRequest = new createCategoiresDto(categoriesName);
      const createCategories =
        await this.categoriesService.createCategoriesService(categoriesRequest);
      if (!createCategories) {
        return res.status(401).json({ error: '카테고리 생성에 실패했습니다' });
      }
      return res.status(200).json({ message: createCategories });
    } catch (error) {
      next(error);
    }
  }
  public async updateCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { categoriesName } = req.body;
      const { categoriesId } = req.params;
      const categoriesIdInt = parseInt(categoriesId, 10);
      const categories = new updateCategoriesDTO(
        categoriesIdInt,
        categoriesName,
      );
      const updateCategoies =
        await this.categoriesService.updateCategoriesService(categories);
      if (!updateCategoies) {
        return res
          .status(401)
          .json({ error: '카테고리 업데이트에 실패했습니다' });
      }
      return res.status(201).json({ message: updateCategoies });
    } catch (error) {
      next(error);
    }
  }
  public async getAllCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const getAll = await this.categoriesService.getCategoriesService();
      return res.status(201).json({ message: getAll });
    } catch (error) {
      next(error);
    }
  }

  public async getCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { categoriesId } = req.params;
    const categoriesIdInt = parseInt(categoriesId, 10);
    const categories = new categoriesDTO(categoriesIdInt);
    const getCategories =
      await this.categoriesService.getCategoriesIdService(categories);
    if (!getCategories) {
      res.status(404).json({ error: '해당 카테고리가 없습니다' });
    }
    return res.status(201).json({ message: getCategories });
  }

  public async deleteCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { categoriesId } = req.params;
    const categoriesIdInt = parseInt(categoriesId, 10);
    const categories = new categoriesDTO(categoriesIdInt);
    const deleteOne =
      await this.categoriesService.deleteCategoriesServie(categories);
    if (!deleteOne) {
      return res.status(401).json({ error: '삭제에 실패했습니다' });
    }
    return res.status(200).json({ message: deleteOne });
  }
}
