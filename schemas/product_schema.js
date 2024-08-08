import Joi from 'joi';

export const productSchema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.number().required()
})