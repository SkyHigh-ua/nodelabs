import * as services from '../services/posts.services'
import { Request, Response, NextFunction } from 'express';

export async function get(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.get(+req.params.postId));
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.create(req.body));
    } catch (err) {
        next(err);
    }
}

export async function put(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.update(+req.params.postId, req.body));
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction){
    try {
        res.send(await services.remove(+req.params.postId))
    } catch (err) {
        next(err);
    }
}