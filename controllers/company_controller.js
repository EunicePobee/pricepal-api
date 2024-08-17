import { CompanyModel } from "../models/company_model.js";
import { companySchema } from "../schemas/company_schema.js";
import { CategoryModel } from "../models/category_model.js"


// Function to add a company
export const postCompany = async (req, res, next) => {
    try {
        // Validate data provided by the user
        const { error, value } = companySchema.validate({
            ...req.body,
            logo: req.file.filename
        });
        // console.log(req.body)
        // console.log(req.file)
        if (error) {
            // Return validation error message 
            return res.status(400).send(error.details[0].message)
        }

        // console.log('Request Body:', req.body);
        // console.log('Category ID from Request:', req?.category?.id);

        // Extract the company name from the request body
        const { companyName } = value
        //  Check if company already exists
        const existingCompany = await CompanyModel.findOne({ companyName });
        if (existingCompany) {
            // Return conflict status if company exists
            return res.status(409).json('The Company already exists.')
        }

        console.log('Req.body.categoryTd', req.body.categoryId)
        const categoryId = req.body.categoryId
        

        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).send("Category not found");
        }

        // Create new company with the validated value
        const newCompany = await CompanyModel.create({
            ...value,
            // logo: req.file.filename,
            category: categoryId
        });
        console.log('Category.companies', category.companies)
        category.companies.push(newCompany)

        // Save the new company to the database
        await category.save();

        // Return success response with the new company
        res.status(201).json({ message: 'Company created successfully', newCompany })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to get all companies
export const getCompanies = async (req, res, next) => {
    try {
        // Destructure and parse query params with defaults
        const {
            filter = "{}",
            sort = "{}",
            fields = "{}",
            limit = 10,
            skip = 0
        } = req.query;

        // Parse query parameters
        const filterParsed = JSON.parse(filter);
        const sortParsed = JSON.parse(sort);
        const fieldsParsed = JSON.parse(fields);
        const limitParsed = parseInt(limit, 10);
        const skipParsed = parseInt(skip, 10);

        // Get all companies from database
        const allCompanies = await CompanyModel
            .find(filterParsed)
            .sort(sortParsed)
            .select(fieldsParsed)
            .limit(limitParsed)
            .skip(skipParsed);
        // Return response
        res.status(200).json(allCompanies);
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to get a company by id
export const getCompanyById = async (req, res, next) => {
    try {
        // Get company by id
        const getCompany = await CompanyModel.findById(req.params.id);
        // Check if the company exists
        if (!getCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        // Return response
        return res.status(200).json(getCompany)
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
}


// Function to get everything about one company
export const getCompleteCompany = async (req, res, next) => {
    try {
        const companyName = req.params.companyName.toLowerCase();
        const options = { sort: {price: 1 }}
        // Get company details
        const getCompanyDetails = await CompanyModel
            .findOne({ companyName })
            .populate({ path: 'products', options })

        // Return response
        return res.status(200).json({ company: getCompanyDetails })
    } catch (error) {
        next(error)
        console.log(error)
    }
}


// Function to update a company
export const updateCompany = async (req, res, next) => {
    try {
        // Validate data provided by user
        const { error, value } = companySchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Update company by id
        const updatedCompany = await CompanyModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        // Return response
        res.status(200).json({ message: 'Company updated successfully', updatedCompany })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to delete a company
export const deleteCompany = async (req, res, next) => {
    try {
        // Delete company by id
        const deletedCompany = await CompanyModel.findByIdAndDelete(req.params.id, req.body)
        if (!deletedCompany) {
            return res.status(404).send({ message: 'Company not found' });
        }
        // Return response
        res.status(200).json({ message: 'Company successfully deleted' })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}