import {
  IcategoriesRequest,
  IcategoriesupdateRequest,
  IcategoriesDeleteRequest,
  IcategoriescreateRequest,
} from './icategoriesRequest';
import { Icategories } from './icategories';

export interface IcategoriesRepository {
  createCategoires(categories: IcategoriescreateRequest): Promise<Icategories>;
  updateCategoires(categories: IcategoriesupdateRequest): Promise<Icategories>;
  getCategories(categories: number): Promise<Icategories>;
  deleteCategories(categories: IcategoriesDeleteRequest): Promise<boolean>;
  getallCategories(): Promise<Icategories[]>;
}
