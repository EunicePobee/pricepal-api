import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { deleteCompany, getCompanies, getCompanyById, postCompany, updateCompany } from "../controllers/company_controller.js";


// Create router
export const companyRouter = Router();


// Define routes
companyRouter.post('/admin/companies', checkAuth, hasPermission, postCompany);

companyRouter.get('/admin/companies', checkAuth, hasPermission, getCompanies);

companyRouter.get('/admin/companies/:id', checkAuth, hasPermission, getCompanyById);

companyRouter.patch('/admin/companies/:id', checkAuth, hasPermission, updateCompany);

companyRouter.delete('/admin/companies/:id', checkAuth, hasPermission, deleteCompany);