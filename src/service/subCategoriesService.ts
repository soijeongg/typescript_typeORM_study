import { Categories } from '../entities';
import { IcategoriesRepository } from '../interfaces/Categories/icategoriesRepository';
import { Isubcategories } from '../interfaces/subCategories/isubCategories';
import {
  getAndDeleteSubCategoriesDto,
  createsubCategoiesDto,
  updatesubCategoiresDto,
} from '../DTO/subCategories/subCategoriesDto';
import { categoriesDTO } from '../DTO/categories/categoriesDTO';
import { Icategories } from '../interfaces/Categories/icategories';
import { IsubCategoriesRepository } from '../interfaces/subCategories/isubCategorisRepository';
import { IsubCategoriesService } from '../interfaces/subCategories/isubSubcategoriesSerivice';

export class subCateoriesService implements IsubCategoriesService {
  //의존성 선언
  private subCategoriesRepostiory: IsubCategoriesRepository;
  private categoriesRepostiory: IcategoriesRepository;
  //의존성 주입
  constructor(
    subCategoriesRepostiory: IsubCategoriesRepository,
    categoriesRepostiory: IcategoriesRepository,
  ) {
    this.subCategoriesRepostiory = subCategoriesRepostiory;
    this.categoriesRepostiory = categoriesRepostiory;
  }

  async createSubCategoriesService(
    subcategories: createsubCategoiesDto,
  ): Promise<Isubcategories> {
    //카테고리 여부 확인
    const findCategories = await this.categoriesRepostiory.getCategories(
      subcategories.categoriesId,
    );
    if (!findCategories) {
      throw new Error('카테고리가 존재하지 않습니다');
    }

    const createSubCategories =
      await this.subCategoriesRepostiory.createSubRepository(subcategories);
    return createSubCategories;
  }
  async updateSubCategoriesService(
    subCategories: updatesubCategoiresDto,
  ): Promise<Isubcategories | null> {
    const findCategories = await this.categoriesRepostiory.getCategories(
      subCategories.categoriesId,
    );
    if (!findCategories) {
      throw new Error('카테고리가 존재하지 않습니다');
    }
    const updatesub =
      await this.subCategoriesRepostiory.updateSubRepository(subCategories);
    return updatesub;
  }

  async deleteSubCategoriesService(
    subCategories: getAndDeleteSubCategoriesDto,
  ): Promise<Boolean> {
    //카테고리 여부 확인
    const findCategories = await this.categoriesRepostiory.getCategories(
      subCategories.categoriesId,
    );
    if (!findCategories) {
      throw new Error('카테고리가 존재하지 않습니다');
    }
    const deletesub =
      await this.subCategoriesRepostiory.deletesubcRepository(subCategories);
    return deletesub;
  }

  async getAllSubCategoriesService(
    subcategories: categoriesDTO,
  ): Promise<Icategories | null> {
    //카테고리 여부 확인
    const findCategories = await this.categoriesRepostiory.getCategories(
      subcategories.categoriesId,
    );
    if (!findCategories) {
      throw new Error('카테고리가 존재하지 않습니다');
    }
    const getAllSub =
      await this.subCategoriesRepostiory.getAllSubcategoriesRepository(
        subcategories,
      );
    return getAllSub;
  }

  async getIdSubcategoriesService(
    subCategories: getAndDeleteSubCategoriesDto,
  ): Promise<Isubcategories | null> {
    //카테고리 여부 확인
    const findCategories = await this.categoriesRepostiory.getCategories(
      subCategories.categoriesId,
    );
    if (!findCategories) {
      throw new Error('카테고리가 존재하지 않습니다');
    }
    const getIdSubcateogires =
      await this.subCategoriesRepostiory.getIdSubcategoriesRepostiory(
        subCategories,
      );
    return getIdSubcateogires;
  }
}
