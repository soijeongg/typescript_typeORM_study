import { Icategories } from './icategories';
import { IcategoriesRepository } from './icategoriesRepository';
import { createCategoiresDto } from '../../DTO/categories/createCategoriesDto';
import { updateCategoriesDTO } from '../../DTO/categories/updateCategoriesDto';
import { getAndDeleteSubCategoriesDto } from '../../DTO/subCategories/subCategoriesDto';
export interface IcategoriesService {
  createCategoriesService(
    categories: createCategoiresDto,
  ): Promise<Icategories | null>;

  updateCategoriesService(
    categories: updateCategoriesDTO,
  ): Promise<Icategories | null>;

  getCategoriesService(): Promise<Icategories[] | null>;
  deleteCategoriesServie(
    categories: getAndDeleteSubCategoriesDto,
  ): Promise<boolean>;
  getCategoriesIdService(
    categories: getAndDeleteSubCategoriesDto,
  ): Promise<Icategories | null>;
}
