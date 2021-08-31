import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImporCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';


const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

const listCategoriesController = new ListCategoriesController();

const importCategoryController = new ImporCategoryController();

// Cadastro da Categoria:
categoriesRoutes.post("/", createCategoryController.handle);

// Listar as categorias
categoriesRoutes.get("/", listCategoriesController.handle);

// Upload Mullter
categoriesRoutes.post("/import", upload.single('file'), importCategoryController.handle);


export { categoriesRoutes }; 
