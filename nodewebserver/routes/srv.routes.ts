import express from 'express';
import Joi from 'joi';
import * as ctrl from '../controllers/srv.controllers'
import * as mdlvr from '../middlewares/srv.middlewares'

export const router = express.Router();

// список користувачів
router.get('/users', ctrl.get);
// отримання даних користувача за його id
router.get('/users/:userId', ctrl.get);
// створення користувача
router.post('/users/', mdlvr.validateBody(Joi.object({
        username: Joi.string().required(),
        name: Joi.string()
    })), ctrl.post);
// оновлення даних користувача за його id
router.put('/users/:userId', mdlvr.validateBody(Joi.object({
        username: Joi.string(),
        name: Joi.string()
    })), ctrl.put);
// видалення користувача за його id
router.delete('/users/:userId', ctrl.remove);