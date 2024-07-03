export class createsubCategoiesDto {
  subCategoriesName: string;
  categoriesId: number;

  constructor(subCategoriesName: string, categoriesId: number) {
    this.categoriesId = categoriesId;
    this.subCategoriesName = subCategoriesName;
  }
}

export class updatesubCategoiresDto {
  subCategoriesName: string;
  subCategoriesId: number;
  categoriesId: number;

  constructor(
    subCategoriesName: string,
    subCategoriesId: number,
    categoriesId: number,
  ) {
    this.subCategoriesName = subCategoriesName;
    this.categoriesId = categoriesId;
    this.subCategoriesId = subCategoriesId;
  }
}

export class getAndDeleteSubCategoriesDto {
  subCategoriesId: number;
  categoriesId: number;

  constructor(subcategoriesId: number, categoriesId: number) {
    this.categoriesId = categoriesId;
    this.subCategoriesId = subcategoriesId;
  }
}
