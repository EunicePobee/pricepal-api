import { CategoryModel } from "../models/category_model.js";
import { categorySchema } from "../schemas/category_schema.js";


// Function to add a category
export const postCategory = async (req, res, next) => {
    try {
        // Validate data provided by the user
        const { error, value } = categorySchema.validate(req.body);
        if (error) {
           // Return validation error message 
            return res.status(400).send(error.details[0].message)
        }

        // Extract the category name from the request body
        const { categoryName } = value
        //  Check if category already exists
        const existingCategory = await CategoryModel.findOne({ categoryName });
        if (existingCategory) {
            // Return conflict status if category exists
            return res.status(409).json('The category already exists.')
        }

        // Create new category with the validated value
        const newCategory = await CategoryModel.create({ ...value});
        // Save the new category to the database
        await newCategory.save();

        // Return success response with the new category
         res.status(201).json({ message: 'Category created successfully', newCategory })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to get all categories
export const getCategories = async (req, res, next) => {
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

        // Get all categories from database
        const allCategories = await CategoryModel
            .find(filterParsed)
            .sort(sortParsed)
            .select(fieldsParsed)
            .limit(limitParsed)
            .skip(skipParsed);
        // Return response
        res.status(200).json(allCategories);
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to get a category by id
export const getCategoryById = async (req, res, next) => {
    try {
        // Get category by id
        const getCategory = await CategoryModel.findById(req.params.id);
        // Check if the category exists
        if (!getCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Return response
        return res.status(200).json(getCategory)
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
}


// Function to get everything about one category
export const getCompleteCategory = async (req, res,next) => {
    try {
        const categoryName = req.params.categoryName.toLowerCase();
        // const options = { sort: {startDate: -1 }}
        // Get category details
        const getCategoryDetails = await CategoryModel
            .findOne({categoryName})
            .populate({path: 'companies'})
            
        // Return response
        return res.status(200).json({category: getCategoryDetails})
    } catch (error) {
        next(error)
        console.log(error)
    }
}


// Function to update a category
export const updateCategory = async (req, res, next) => {
    try {
        // Validate data provided by user
        const { error, value } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
    
        // Update category by id
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Return response
        res.status(200).json({ message: 'Category updated successfully', updatedCategory })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}


// Function to delete a category
export const deleteCategory = async (req, res, next) => {
    try {
        // Delete category by id
        const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id, req.body)
        if (!deletedCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }
        // Return response
        res.status(200).json({ message: 'Category successfully deleted' })
    } catch (error) {
        // Pass error to error handling middleware
        next(error)
    }
}