import express from 'express';
import { subCategoriesController } from '../../controller/subCategoriesController';
import { subCateoriesService } from '../../service/subCategoriesService';
import { categoriesRepository } from '../../respository/Categories/categoriesRepository';
import { subvategoriesRepository } from '../../respository/subCategories/subCategoriesRepository';

const router = express.Router();
const subcategoriesRepostiory = new subvategoriesRepository();
const CategoriesRepository = new categoriesRepository();
const subCategoriesService = new subCateoriesService(subcategoriesRepostiory,CategoriesRepository);
const SubCategoriesController = new subCategoriesController(subCategoriesService)

router.get('/:categoriesId', SubCategoriesController.getAllSubCatergoriesController)
router.get('/:categoriesId/:subCategoriesId', SubCategoriesController.getIdSubcategoriesController)
router.post('/:categoriesId', SubCategoriesController.createSubCategoriesController)
router.put('/:categoriesId/:subCategoriesId', SubCategoriesController.updateSubCategoriesController)
router.delete('/:categoriesId/:subCategoriesId', SubCategoriesController.deleteSubCategoriesController)

export default router;
