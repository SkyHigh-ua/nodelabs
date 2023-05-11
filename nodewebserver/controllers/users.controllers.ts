import * as services from '../services/users.services'
import { Request, Response, NextFunction } from 'express';

export async function get(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.get(+req.params.userId));
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.create({
            username:req.body.username,  
            name:req.body.name
        }));
    } catch (err) {
        next(err);
    }
}

export async function put(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.update(+req.params.userId, {
            username:req.body.username,  
            name:req.body.name
        }));
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction){
    try {
        res.send(await services.remove(+req.params.userId))
    } catch (err) {
        next(err);
    }
}