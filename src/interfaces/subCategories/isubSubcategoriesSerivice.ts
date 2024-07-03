import { categoriesDTO } from '../../DTO/categories/categoriesDTO';
import {
  createsubCategoiesDto,
  updatesubCategoiresDto,
  getAndDeleteSubCategoriesDto,
} from '../../DTO/subCategories/subCategoriesDto';
import { Icategories } from '../Categories/icategories';
import { Isubcategories } from './isubCategories';

export interface IsubCategoriesService {
  createSubCategoriesService(
    subcategories: createsubCategoiesDto,
  ): Promise<Isubcategories>;
  updateSubCategoriesService(
    subCategories: updatesubCategoiresDto,
  ): Promise<Isubcategories | null>;
  deleteSubCategoriesService(
    subCategories: getAndDeleteSubCategoriesDto,
  ): Promise<Boolean>;
  getAllSubCategoriesService(
    subcategories: categoriesDTO,
  ): Promise<Icategories | null>;
  getIdSubcategoriesService(
    subCategories: getAndDeleteSubCategoriesDto,
  ): Promise<Isubcategories | null>;
}
