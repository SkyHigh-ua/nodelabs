import * as middleware from '../middlewares/middlewares'
import Joi from 'joi'

export const postMiddleware = middleware.validateBody(Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    userId: Joi.number().required()
    }));

export const putMiddleware = middleware.validateBody(Joi.object({
    title: Joi.string(),
    text: Joi.string(),
    userId: Joi.number()
    }));