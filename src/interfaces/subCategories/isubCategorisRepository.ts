import { Isubcategories } from './isubCategories';
import {
  getAndDeleteSubCategoriesDto,
  createsubCategoiesDto,
  updatesubCategoiresDto,
} from '../../DTO/subCategories/subCategoriesDto';
import { categoriesDTO } from '../../DTO/categories/categoriesDTO';
import { Icategories } from '../Categories/icategories';
export interface IsubCategoriesRepository {
  createSubRepository(
    subCategories: createsubCategoiesDto,
  ): Promise<Isubcategories>;
  updateSubRepository(
    subCategories: updatesubCategoiresDto,
  ): Promise<Isubcategories | null>;
  deletesubcRepository(
    subCategories: getAndDeleteSubCategoriesDto,
  ): Promise<boolean>;
  getAllSubcategoriesRepository(
    subCategories: categoriesDTO,
  ): Promise<Icategories | null>;
  getIdSubcategoriesRepostiory(
    subCategories: getAndDeleteSubCategoriesDto,
  ): Promise<Isubcategories | null>;
}
