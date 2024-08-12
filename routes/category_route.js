import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { deleteCategory, getCategories, getCategoryById, postCategory, updateCategory } from "../controllers/category_controller.js";


// Create router
export const categoryRouter = Router();


// Define routes
categoryRouter.post('/admin/categories', checkAuth, hasPermission, postCategory);

categoryRouter.get('/admin/categories', checkAuth, hasPermission, getCategories);

categoryRouter.get('/admin/categories/:id', checkAuth, hasPermission, getCategoryById);

categoryRouter.patch('/admin/categories/:id', checkAuth, hasPermission, updateCategory);

categoryRouter.delete('/admin/categories/:id', checkAuth, hasPermission, deleteCategory);