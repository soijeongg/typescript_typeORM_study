import { Icategories } from './icategories';
import { IcategoriesRepository } from './icategoriesRepository';
import {
  IcategoriesRequest,
  IcategoriesDeleteRequest,
  IcategoriesupdateRequest,
  IcategoriescreateRequest,
} from './icategoriesRequest';

export interface IcategoriesService {
  createCategoriesService(
    categories: IcategoriescreateRequest,
  ): Promise<Icategories | null>;

  updateCategoriesService(
    categories: IcategoriesupdateRequest,
  ): Promise<Icategories | null>;

  getCategoriesService(): Promise<Icategories[] | null>;
  deleteCategoriesServie(
    categories: IcategoriesDeleteRequest,
  ): Promise<boolean>;
  getCategoriesIdService(
    categories: IcategoriesRequest,
  ): Promise<Icategories | null>;
}
