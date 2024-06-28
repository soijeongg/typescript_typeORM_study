export interface IcategoriesRequest {
  categoriesName: string;
}
export interface IcategoriesupdateRequest {
  categoriesId: number;
  categoriesName: string;
}
export interface IcategoriesDeleteRequest {
  categoriesId: number;
}
export interface IcategoriesGetRequest {
  categoriesId: number;
}
