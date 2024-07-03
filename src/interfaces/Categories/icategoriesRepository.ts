import { createCategoiresDto } from '../../DTO/categories/createCategoriesDto';
import { updateCategoriesDTO } from '../../DTO/categories/updateCategoriesDto';
import { categoriesDTO } from '../../DTO/categories/categoriesDTO';
import { Icategories } from './icategories';

export interface IcategoriesRepository {
  createCategoires(categories: createCategoiresDto): Promise<Icategories>;
  updateCategoires(categories: updateCategoriesDTO): Promise<Icategories>;
  getCategories(categories: number): Promise<Icategories>;
  deleteCategories(categories: categoriesDTO): Promise<boolean>;
  getallCategories(): Promise<Icategories[]>;
}
