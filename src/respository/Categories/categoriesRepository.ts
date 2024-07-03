import { AppDataSource } from '../../dataSource';
import { Icategories } from '../../interfaces/Categories/icategories';
import { IcategoriesRepository } from '../../interfaces/Categories/icategoriesRepository';
import { categoriesDTO } from '../../DTO/categories/categoriesDTO';
import { updateCategoriesDTO } from '../../DTO/categories/updateCategoriesDto';
import { createCategoiresDto } from '../../DTO/categories/createCategoriesDto';
import { Categories } from '../../entities';

export class categoriesRepository implements IcategoriesRepository {
  private categoriesRepository = AppDataSource.getRepository(Categories);
  constructor() {}

  async createCategoires(
    categories: createCategoiresDto,
  ): Promise<Icategories> {
    const newCategories = await this.categoriesRepository.create(categories);
    const saveCategories = await this.categoriesRepository.save(newCategories);
    return saveCategories;
  }
  async updateCategoires(
    categories: updateCategoriesDTO,
  ): Promise<Icategories> {
    let findcategory = await this.categoriesRepository.findOne({
      where: { categoriesId: categories.categoriesId },
    });
    if (!findcategory) {
      throw new Error('카테고리를 찾을 수 없습니다');
    }
    await this.categoriesRepository.update(categories.categoriesId, categories);
    let updateCategoires = await this.categoriesRepository.findOne({
      where: { categoriesId: categories.categoriesId },
    });
    if (!updateCategoires) {
      throw new Error('Error retrieving updated category');
    }
    return updateCategoires;
  }
  async getCategories(categories: number): Promise<Icategories> {
    const findOneCategories = await this.categoriesRepository.findOne({
      where: { categoriesId: categories },
      relations: ['subCategories'],
    });
    if (!findOneCategories) {
      throw new Error('찾으시려는 카테고리가 없습니다 ');
    }
    return findOneCategories;
  }
  async deleteCategories(categories: categoriesDTO): Promise<boolean> {
    const deleteCategories = await this.categoriesRepository.delete(
      categories.categoriesId,
    );
    return deleteCategories.affected != 0;
  }

  async getallCategories(): Promise<Icategories[]> {
    return this.categoriesRepository.find();
  }
}
