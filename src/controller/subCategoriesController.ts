import { Request, Response, NextFunction } from 'express';
import { ISubCategoriesController } from '../interfaces/subCategories/isubCategoriesController';
import { subCateoriesService } from '../service/subCategoriesService';
import { createsubCategoiesDto, getAndDeleteSubCategoriesDto, updatesubCategoiresDto } from '../DTO/subCategories/subCategoriesDto';
import { categoriesDTO } from '../DTO/categories/categoriesDTO';

export class subCategoriesController implements ISubCategoriesController {
  private subCateoriesService: subCateoriesService;

  constructor(subCateoriesService: subCateoriesService) {
    this.subCateoriesService = subCateoriesService;
    this.createSubCategoriesController =
      this.createSubCategoriesController.bind(this);
    this.updateSubCategoriesController = this.updateSubCategoriesController.bind(this);
    this.deleteSubCategoriesController = this.deleteSubCategoriesController.bind(this);
    this.getAllSubCatergoriesController = this.getAllSubCatergoriesController.bind(this);
    this.getIdSubcategoriesController = this.getIdSubcategoriesController.bind(this);
  }
    async createSubCategoriesController(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
      const { subCategoriesName } = req.body;
      const { categoriesId } = req.params;
      const categoriesIdInt = parseInt(categoriesId, 10);
      const subCategoriesDto = new createsubCategoiesDto(subCategoriesName, categoriesIdInt)
      const createSubCategories = await this.subCateoriesService.createSubCategoriesService(subCategoriesDto);
      if (!createSubCategories) {
        return res
          .status(401)
          .json({ message: '서브카테고리 생성에 실패했습니다' });
      }
      return res.status(201).json({ createSubCategories });
    } catch (error) {
      next(error);
    }
  }
  async updateSubCategoriesController(req: Request, res: Response, next: NextFunction): Promise<Response |void> {
    try {
      const { subCategoriesName } = req.body;
      const { categoriesId, subCategoriesId } = req.params;
      const categoriesIdInt = parseInt(categoriesId, 10);
      const subCategoriesIdInt = parseInt(subCategoriesId, 10);
      const upgradeDto = new updatesubCategoiresDto(subCategoriesName, subCategoriesIdInt, categoriesIdInt);

      const updateSubCategories =
        await this.subCateoriesService.updateSubCategoriesService(upgradeDto);
      if (!updateSubCategories) {
        return res.status(401).json({message:"업데이트에 실패했습니다"})
      }
      return res.status(201).json({updateSubCategories})
    } catch (error) {
      next(error);
    }
  }

  async deleteSubCategoriesController(req: Request, res: Response, next: NextFunction): Promise<Response |void> {
    try {
      const {categoriesId, subCategoriesId} = req.params;
      const categoriesIdInt = parseInt(categoriesId, 10);
      const subCategoriesIdInt = parseInt(subCategoriesId, 10);
      const newDeleteDto = new getAndDeleteSubCategoriesDto(subCategoriesIdInt, categoriesIdInt);
      const deleteSubCategories = await this.subCateoriesService.deleteSubCategoriesService(newDeleteDto);
      if (!deleteSubCategories) {
        return res
          .status(401)
          .json({message:"서브 카테고리 삭제에 실패했습니다"})
      }
      return res.status(201).json({ deleteSubCategories });
    } catch (error) {
      next(error);
    }
  }
  async getAllSubCatergoriesController(req: Request, res: Response, next: NextFunction): Promise<Response |void> {
    const { categoriesId } = req.params;
    const categoriesIdInt = parseInt(categoriesId, 10);
    const newallDto = new categoriesDTO(categoriesIdInt);
    const allSubCategories = await this.subCateoriesService.getAllSubCategoriesService(newallDto);
    if (!allSubCategories) {
      return res.status(401).json({message:"조회에 실패했습니다"})
    }
    return res.status(201).json({ allSubCategories });
  }
  async getIdSubcategoriesController(req: Request, res: Response, next: NextFunction): Promise<Response |void> {
    try {
      const { categoriesId, subCategoriesId } = req.params;
      const categoriesIdInt = parseInt(categoriesId, 10);
      const subCategoriesIdInt = parseInt(subCategoriesId, 10);
      const newGetDto = new getAndDeleteSubCategoriesDto(subCategoriesIdInt, categoriesIdInt);
      const getIdSubcategories = await this.subCateoriesService.getIdSubcategoriesService(newGetDto);
      if (!getIdSubcategories) {
        return res.status(401).json({message: "조회에 실패했습니다"})
      }
      return res.status(201).json({getIdSubcategories})
    } catch (error) {
      next(error);
}

  }
}
