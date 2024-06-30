export class updateCategoriesDTO {
  categoriesId: number;
  categoriesName: string;
  constructor(categoriesId: number, categoriesName: string) {
    this.categoriesId = categoriesId;
    this.categoriesName = categoriesName;
  }
}
