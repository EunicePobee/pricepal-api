import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { deleteCompany, getCompanies, getCompanyById, getCompleteCompany, postCompany, updateCompany } from "../controllers/company_controller.js";
import { remoteUpload } from "../middlewares/upload.js";


// Create router
export const companyRouter = Router();


// Define routes
companyRouter.post('/admin/companies', remoteUpload.single('logo'), checkAuth, hasPermission('post_company'), postCompany);

companyRouter.get('/admin/companies', getCompanies);

companyRouter.get('/admin/companies/:id', getCompanyById);

companyRouter.get('/admin/companies/:companyName', getCompleteCompany)

companyRouter.patch('/admin/companies/:id', remoteUpload.single('logo'), checkAuth, hasPermission('update_company'), updateCompany);

companyRouter.delete('/admin/companies/:id', checkAuth, hasPermission('delete_company'), deleteCompany);