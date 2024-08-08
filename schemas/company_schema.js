import Joi from 'joi';

export const companySchema = Joi.object({
    companyName: Joi.string().required(),
    logo: Joi.string().required()
})