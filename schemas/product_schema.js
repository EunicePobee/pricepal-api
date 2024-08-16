import Joi from 'joi';

export const productSchema = Joi.object({
    productName: Joi.string().required(),
    categoryId: Joi.string(),
    companyId: Joi.string(),
    state: Joi.string(),
    price: Joi.number().required()
})