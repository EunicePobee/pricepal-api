import { ProductModel } from "../models/product_model.js";
import { productSchema } from "../schemas/product_schema.js";
import { CompanyModel } from "../models/company_model.js";


// Function to add a product
export const postProduct = async (req, res, next) => {
    try {
        // Validate data provided by the user
        const { error, value } = productSchema.validate(req.body);
        if (error) {
           // Return validation error message 
            return res.status(400).send(error.details[0].message)
        }

        // Extract the product name from the request body
        const { productName, companyId, state } = req.body
        // const companyId = req.body.companyId
        //  Check if product already exists
        const existingProduct = await ProductModel.findOne({ productName: productName, companyId: companyId, state: state});
        if (existingProduct) {
            // Return conflict status if product exists
            return res.status(409).json('The Product with the same name  already exists for this company.')
        }

        const company = await CompanyModel.findById(companyId);
        if(!company) {
            return res.status(404).send("Company not found");
        }

        // Create new product with the validated value
        const newProduct = await ProductModel.create({ ...value, company: companyId });
        company.products.push(newProduct._id)
        // Save the new product to the database
        await company.save();

        // Return success response with the new product
         res.status(201).json({ message: 'Product created successfully', newProduct })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to get all products
export const getProducts = async (req, res, next) => {
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

        // Get all products from database
        const allProducts = await ProductModel
            .find(filterParsed)
            .sort(sortParsed)
            .select(fieldsParsed)
            .limit(limitParsed)
            .skip(skipParsed);
        // Return response
        res.status(200).json(allProducts);
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to get a product by id
export const getProductById = async (req, res, next) => {
    try {
        // Get product by id
        const getProduct = await ProductModel.findById(req.params.id);
        // Check if the product exists
        if (!getProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Return response
        return res.status(200).json(getProduct)
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
}


// Function to update a product
export const updateProduct = async (req, res, next) => {
    try {
        // Validate data provided by user
        const { error, value } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
    
        // Update product by id
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Return response
        res.status(200).json({ message: 'Product updated successfully', updatedProduct })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to delete a product
export const deleteProduct = async (req, res, next) => {
    try {
        // Delete product by id
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id, req.body)
        if (!deletedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }
        // Return response
        res.status(200).json({ message: 'Product successfully deleted' })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}