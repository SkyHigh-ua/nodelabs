import * as fs from 'fs';
import { db } from '../config/db.config'

export async function get(id?: number){
    if (id) {
        let data = await fs.promises.readFile(db.dbpath, 'utf8');
        let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
        return jsondata.filter(obj => obj.id === id)[0];
    } else {
        let data = await fs.promises.readFile(db.dbpath, 'utf8');
        return JSON.parse(data);  
    }
}

export async function create(obj: {username: string, name?: string}){
    let data = await fs.promises.readFile(db.dbpath, 'utf8');
    let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
    let response = {  
        id:jsondata.length,
        username:obj.username,  
        name:obj.name ? obj.name : undefined
    };  
    jsondata.push(response);
    await fs.promises.writeFile(db.dbpath, JSON.stringify(jsondata));
    return response;
}

export async function update(id: number, obj: {username?: string, name?: string}){
    let data = await fs.promises.readFile(db.dbpath, 'utf8');
    let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
    let olddata = jsondata.filter(obj => obj.id === id)[0];
    let response = {  
        id:id,
        username:obj.username ? obj.username : olddata.username, 
        name:obj.name ? obj.name : olddata.name
    };
    jsondata.forEach((item, index) => {
        if (item.id === id) jsondata.splice(index, 1);
    });
    jsondata.push(response);
    await fs.promises.writeFile(db.dbpath, JSON.stringify(jsondata));
    return response;
}

export async function remove(id: number){
    let data = await fs.promises.readFile(db.dbpath, 'utf8');
    let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
    jsondata.forEach((item, index) => {
        if (item.id === id) jsondata.splice(index, 1);
    });
    await fs.promises.writeFile(db.dbpath, JSON.stringify(jsondata));
    return 'user deleted';
}