import { Icategories } from './icategories';
import { IcategoriesRepository } from './icategoriesRepository';
import {
  IcategoriesRequest,
  IcategoriesDeleteRequest,
  IcategoriesGetRequest,
  IcategoriesupdateRequest,
} from './icategoriesRequest';

export interface IcategoriesService {
  createCategoriesService(categories: IcategoriesRequest): Promise<Icategories>;

  updateCategoriesService(
    categories: IcategoriesupdateRequest,
  ): Promise<Icategories>;

  getCategoriesService(categories: IcategoriesGetRequest): Promise<Icategories>;
  deleteCategoriesServie(
    categories: IcategoriesDeleteRequest,
  ): Promise<boolean>;

  updateCategoriesService(
    categories: IcategoriesupdateRequest,
  ): Promise<Icategories>;

  getAllCategoriesService(): Promise<Icategories[]>;
}
