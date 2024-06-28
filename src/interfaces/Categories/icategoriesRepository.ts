import {
  IcategoriesRequest,
  IcategoriesupdateRequest,
  IcategoriesDeleteRequest,
  IcategoriesGetRequest,
} from './icategoriesRequest';
import { Icategories } from './icategories';

export interface IcategoriesRepository {
  createCategoires(categories: IcategoriesRequest): Promise<Icategories>;
  updateCategoires(categories: IcategoriesupdateRequest): Promise<Icategories>;
  getCategories(categories: IcategoriesGetRequest): Promise<Icategories>;
  deleteCategories(categories: IcategoriesDeleteRequest): Promise<boolean>;
  getallCategories(): Promise<Icategories[]>;
}
