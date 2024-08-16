import Joi from 'joi';

export const companySchema = Joi.object({
    companyName: Joi.string().required(),
    categoryId: Joi.string().required(),
    logo: Joi.string()
})