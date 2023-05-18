import express from 'express';
import * as controller from '../controllers/posts.controllers'
import * as middleware from '../middlewares/middlewares'
import Joi from 'joi'

export const router = express.Router();

// список записів
router.get('/posts', controller.get);
// отримання даних про запис за його id
router.get('/posts/:postId', controller.get);
// створення запису
router.post('/posts/', middleware.validateBody(Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    userId: Joi.number().required()
    })), controller.post);
// оновлення даних запис за його id
router.put('/posts/:postId', middleware.validateBody(Joi.object({
    title: Joi.string(),
    text: Joi.string(),
    userId: Joi.number()
    })), controller.put);
// видалення запису за його id
router.delete('/posts/:postId', controller.remove);