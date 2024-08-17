import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { deleteCategory, getCategories, getCategoryById, getCompleteCategory, postCategory, updateCategory } from "../controllers/category_controller.js";


// Create router
export const categoryRouter = Router();


// Define routes
categoryRouter.post('/admin/categories', checkAuth, hasPermission('post_category'), postCategory);

categoryRouter.get('/admin/categories', getCategories);

// categoryRouter.get('/admin/categories/:id', getCategoryById);

categoryRouter.get('/admin/categories/:categoryName', getCompleteCategory);

categoryRouter.patch('/admin/categories/:id', checkAuth, hasPermission('update_category'), updateCategory);

categoryRouter.delete('/admin/categories/:id', checkAuth, hasPermission('delete_category'), deleteCategory);