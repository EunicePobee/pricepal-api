import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { deleteProduct, getProductById, getProducts, postProduct, updateProduct } from "../controllers/product_controller.js";


// Create router
export const productRouter = Router();


// Define routes
productRouter.post('/admin/products', checkAuth, hasPermission, postProduct);

productRouter.get('/admin/products', checkAuth, hasPermission, getProducts);

productRouter.get('/admin/products/:id', checkAuth, hasPermission, getProductById);

productRouter.patch('/admin/products/:id', checkAuth, hasPermission, updateProduct);

productRouter.delete('/admin/products/:id', checkAuth, hasPermission, deleteProduct);