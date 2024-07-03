import { IcategoriesService } from '../interfaces/Categories/IcategoriesService';
import { categoriesRepository } from '../respository/Categories/categoriesRepository';
import { IcategoriesRepository } from '../interfaces/Categories/icategoriesRepository';
import { Icategories } from '../interfaces/Categories/icategories';
import { createCategoiresDto } from '../DTO/categories/createCategoriesDto';
import { updateCategoriesDTO } from '../DTO/categories/updateCategoriesDto';
import { categoriesDTO } from '../DTO/categories/categoriesDTO';

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
    categories: categoriesDTO,
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
    categories: createCategoiresDto,
  ): Promise<Icategories | null> {
    const getCategoriesId =
      await this.CategoriesRepository.createCategoires(categories);
    if (!getCategoriesId) {
      return null;
    }
    return getCategoriesId;
  }
  public async updateCategoriesService(
    categories: updateCategoriesDTO,
  ): Promise<Icategories | null> {
    const updateCategories =
      await this.CategoriesRepository.updateCategoires(categories);
    if (!updateCategories) {
      return null;
    }
    return updateCategories;
  }
  public async deleteCategoriesServie(
    categories: categoriesDTO,
  ): Promise<boolean> {
    const deleteCategories =
      await this.CategoriesRepository.deleteCategories(categories);
    if (!deleteCategories) {
      throw new Error('유저를 찾을 수 없거나 삭제할 수 없습니다');
    }
    return deleteCategories;
  }
}
