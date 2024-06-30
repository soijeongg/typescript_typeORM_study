import { IcategoriesService } from '../interfaces/Categories/IcategoriesService';
import { categoriesRepository } from '../respository/Categories/categoriesRepository';
import { IcategoriesRepository } from '../interfaces/Categories/icategoriesRepository';
import { Icategories } from '../interfaces/Categories/icategories';
import { IcategoriescreateRequest } from '../interfaces/Categories/icategoriesRequest';
import {
  IcategoriesDeleteRequest,
  IcategoriesRequest,
  IcategoriesupdateRequest,
} from '../interfaces/Categories/icategoriesRequest';

export class categoriesService implements IcategoriesService {
  private CategoriesRepository: IcategoriesRepository;

  constructor(CategoriesRepository: IcategoriesRepository) {
    this.CategoriesRepository = CategoriesRepository;
  }
  public async getCategoriesService(): Promise<Icategories[] | null> {
    const getAll = await this.CategoriesRepository.getallCategories();
    if (!getAll) {
      return [];
    }
    return getAll;
  }
  public async getCategoriesIdService(
    categories: IcategoriesRequest,
  ): Promise<Icategories | null> {
    const getCategories = await this.CategoriesRepository.getCategories(
      categories.categoriesId,
    );
    if (!getCategories) {
      return null;
    }
    return getCategories;
  }

  public async createCategoriesService(
    categories: IcategoriescreateRequest,
  ): Promise<Icategories | null> {
    const getCategoriesId =
      await this.CategoriesRepository.createCategoires(categories);
    if (!getCategoriesId) {
      return null;
    }
    return getCategoriesId;
  }
  public async updateCategoriesService(
    categories: IcategoriesupdateRequest,
  ): Promise<Icategories | null> {
    const updateCategories =
      await this.CategoriesRepository.updateCategoires(categories);
    if (!updateCategories) {
      return null;
    }
    return updateCategories;
  }
  public async deleteCategoriesServie(
    categories: IcategoriesDeleteRequest,
  ): Promise<boolean> {
    const deleteCategories =
      await this.CategoriesRepository.deleteCategories(categories);
    if (!deleteCategories) {
      throw new Error('유저를 찾을 수 없거나 삭제할 수 없습니다');
    }
    return deleteCategories;
  }
}
