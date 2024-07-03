import { IsubCategoriesRepository } from "../../interfaces/subCategories/isubCategorisRepository";
import { AppDataSource } from '../../dataSource';
import { Icategories } from "../../interfaces/Categories/icategories";
import { Isubcategories } from "../../interfaces/subCategories/isubCategories";
import { subCategories } from "../../entities";
import { Categories } from "../../entities";
import { categoriesDTO } from "../../DTO/categories/categoriesDTO";
import { createsubCategoiesDto, updatesubCategoiresDto, getAndDeleteSubCategoriesDto } from "../../DTO/subCategories/subCategoriesDto";
export class subvategoriesRepository implements IsubCategoriesRepository{
  private subcategoriesRepostiory = AppDataSource.getRepository(subCategories);
  private categoriesRepository = AppDataSource.getRepository(Categories);
  constructor() {}

  async createSubRepository(subCategories: createsubCategoiesDto): Promise<Isubcategories> {
    const { categoriesId, subCategoriesName } = subCategories;
  const findCategories = await this.categoriesRepository.findOne({where: {categoriesId: categoriesId}})
    if (!findCategories) {
      throw new Error('해당하는 카테고리가 없습니다');
    }
    const newSubCategories = await this.subcategoriesRepostiory.create({
      subCategoriesName,
      Categories: findCategories,
    });
    await this.subcategoriesRepostiory.save(newSubCategories);
    return newSubCategories;
  }
  async updateSubRepository(subCategories: updatesubCategoiresDto): Promise<Isubcategories | null> {
    const { categoriesId, subCategoriesId, subCategoriesName } = subCategories;
    const findSubCategories = await this.subcategoriesRepostiory.findOne({
      where: { subCategoriesId: subCategoriesId },
    });
    if (!findSubCategories) {
      throw new Error('해당하는 서브 카테고리가 없습니다');
    }
    const updateSubCatrgories = await this.subcategoriesRepostiory.update(
      subCategoriesId,
      { subCategoriesName },
    );
    const updateCheck = await this.subcategoriesRepostiory.findOne({
      where: { subCategoriesId },
    });
    return updateCheck;
  }
  async deletesubcRepository(
    subCategories: getAndDeleteSubCategoriesDto,
  ): Promise<boolean> {
    const { categoriesId, subCategoriesId } = subCategories;
    const findSubCategories = await this.subcategoriesRepostiory.findOne({
      where: { subCategoriesId: subCategoriesId },
    });
    if (!findSubCategories) {
      throw new Error('해당하는 서브 카테고리가 없습니다');
    }
    const deleteSubcategories =
      await this.subcategoriesRepostiory.delete(subCategoriesId);
    return deleteSubcategories.affected != 0;
  }
  //이거 아래 둘 어차피 카테고리 아래 있는데 굳이 ?
  async getAllSubcategoriesRepository(
    subCategories: categoriesDTO,
  ): Promise<Icategories | null> {
    const { categoriesId } = subCategories;
    const findCategories = await this.categoriesRepository.findOne({where: {categoriesId}, relations: ["subCategories"],});
    if (!findCategories) {
      throw new Error('해당하는 카테고리가 없습니다');
    }
    return findCategories;
  }

  async getIdSubcategoriesRepostiory(subCategories: getAndDeleteSubCategoriesDto): Promise<Isubcategories | null> {
    const { categoriesId, subCategoriesId } = subCategories;
    const findSubCategories = await this.subcategoriesRepostiory.findOne({
      where: { subCategoriesId },
    });
    return findSubCategories;
  }
}
