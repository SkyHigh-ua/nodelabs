import * as middleware from '../middlewares/middlewares'
import Joi from 'joi'

export const postMiddleware = middleware.validateBody(Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        age: Joi.number().required(),
        info: Joi.string(),
        address: Joi.object({
            city: Joi.string().required(),
            street: Joi.string().required()
        }).required()
        }))

export const putMiddleware = middleware.validateBody(Joi.object({
        username: Joi.string(),
        email: Joi.string(),
        age: Joi.number(),
        info: Joi.string(),
        address: Joi.object({
            city: Joi.string(),
            street: Joi.string()
        })
        }))