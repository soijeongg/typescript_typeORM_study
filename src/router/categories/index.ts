import express from "express";
import { categoriesController } from "../../controller/categoriesController";
import { categoriesRepository } from "../../respository/Categories/categoriesRepository";
import { categoriesService } from "../../service/categoriesService";
const router = express.Router();
const CategoriesRepository = new categoriesRepository();
const CategoriesService = new categoriesService(CategoriesRepository);
const CategoriesController = new categoriesController(CategoriesService);

router.get('/categories', CategoriesController.getAllCategoriesController);
router.get('categories/:id', CategoriesController.getCategoriesController);
router.post('/categories', CategoriesController.createCatergoriesController);
router.put('/categories/:id', CategoriesController.updateCategoriesController);
router.delete(
  '/categories/:id',
  CategoriesController.deleteCategoriesController,
);

export default router;
