import express from 'express';
import Joi from 'joi';
import * as controller from '../controllers/users.controllers'
import * as middleware from '../middlewares/users.middlewares'

export const router = express.Router();

// список користувачів
router.get('/users', controller.get);
// отримання даних користувача за його id
router.get('/users/:userId', controller.get);
// створення користувача
router.post('/users/', middleware.validateBody(Joi.object({
        username: Joi.string().required(),
        name: Joi.string()
    })), controller.post);
// оновлення даних користувача за його id
router.put('/users/:userId', middleware.validateBody(Joi.object({
        username: Joi.string(),
        name: Joi.string()
    })), controller.put);
// видалення користувача за його id
router.delete('/users/:userId', controller.remove);