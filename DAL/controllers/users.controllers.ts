import * as services from '../services/users.services'
import { Request, Response, NextFunction } from 'express';

export async function get(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.get(+req.params.userId, req.body.filter, req.body.page, req.body.limit));
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.create({
            id:req.body.id,
            username:req.body.username,  
            email:req.body.email,
            age:req.body.age,
            info:req.body.info,
            address:req.body.address
        }));
    } catch (err) {
        next(err);
    }
}

export async function put(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await services.update(+req.params.userId, {
            username:req.body.username,  
            email:req.body.email,
            age:req.body.age,
            info:req.body.info,
            address:req.body.address
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