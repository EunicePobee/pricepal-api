import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { deleteProduct, getProductById, getProducts, postProduct, updateProduct } from "../controllers/product_controller.js";


// Create router
export const productRouter = Router();


// Define routes
productRouter.post('/admin/products', checkAuth, hasPermission('post_product'), postProduct);

productRouter.get('/admin/products', getProducts);

productRouter.get('/admin/products/:id', getProductById);

productRouter.patch('/admin/products/:id', checkAuth, hasPermission('update_product'), updateProduct);

productRouter.delete('/admin/products/:id', checkAuth, hasPermission('delete_product'), deleteProduct);