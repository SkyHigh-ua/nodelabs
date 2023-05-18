import express from 'express';
import * as controller from '../controllers/users.controllers'
import * as middleware from '../middlewares/middlewares'
import Joi from 'joi'

export const router = express.Router();

// список користувачів
router.get('/users', controller.get);
// отримання даних користувача за його id
router.get('/users/:userId', controller.get);
// створення користувача
router.post('/users/', middleware.validateBody(Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    age: Joi.number().required(),
    info: Joi.string(),
    address: Joi.object({
        city: Joi.string().required(),
        street: Joi.string().required()
    }).required()
    })), controller.post);
// оновлення даних користувача за його id
router.put('/users/:userId', middleware.validateBody(Joi.object({
    username: Joi.string(),
    email: Joi.string(),
    age: Joi.number(),
    info: Joi.string(),
    address: Joi.object({
        city: Joi.string(),
        street: Joi.string()
    })
    })), controller.put);
// видалення користувача за його id
router.delete('/users/:userId', controller.remove);