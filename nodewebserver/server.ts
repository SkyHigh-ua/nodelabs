// В Node.js з допомогою фреймворка Express напишіть на Typescript веб-сервер, який відповідатиме стандартам REST і реалізовуватиме базові операції CRUD для сутності user (користувач) із полями id, username та name:
// - використовуйте Express і Typescript;
// - реалізуйте CRUD для сутності user (користувач) з описаними нижче ендпоінтами;
// - зробіть ендпоінт "створення користувача" з 
// обов'язковим параметром username і необов'язковим параметром name;
// - зробіть ендпоінт "отримання даних користувача за його id" (id + username + name);
// - зробіть ендпоінт "список користувачів" (список записів id + username + name);
// - зробіть ендпоінт "оновлення даних користувача за його id";
// - зробіть ендпоінт "видалення користувача за його id";
// - не використовуйте баз даних, зберігайте дані локально в пам'яті процесу або у файловій системі.
import * as path from 'path';
import * as fs from 'fs';
import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded())

// список користувачів
app.get('/user', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) throw err;
        let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
        res.json(jsondata);
    });
})
// створення користувача
app.post('/user', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) throw err;
        let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
        if (!req.body.username) throw new Error('Missing username');
        let response = {  
            id:jsondata.length,
            username:req.body.username,  
            name:req.body.name ? req.body.name : undefined
        };  
        jsondata.push(response);
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(jsondata), err => {
            if (err) throw err;
        });
        res.json(response);
    });
})
// отримання даних користувача за його id
app.get('/user/:userId', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) throw err;
        let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
        res.json(jsondata.filter(obj => obj.id === +req.params.userId)[0]);
    });
})
// оновлення даних користувача за його id
app.put('/user/:userId', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) throw err;
        let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
        let olddata = jsondata.filter(obj => obj.id === +req.params.userId)[0];
        let response = {  
            id:+req.params.userId,
            username:req.body.username ? req.body.username : olddata.username,  
            name:req.body.name ? req.body.name : olddata.name
        };  
        jsondata.forEach((item, index) => {
            if (item.id === +req.params.userId) jsondata.splice(index, 1);
        });
        jsondata.push(response);
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(jsondata), err => {
            if (err) throw err;
        });
        res.json(response);
    });
})
// видалення користувача за його id
app.delete('/user/:userId', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) throw err;
        let jsondata: {id: number, username: string, name?: string}[] = JSON.parse(data);
        jsondata.forEach((item, index) => {
            if (item.id === +req.params.userId) jsondata.splice(index, 1);
        });
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(jsondata), err => {
            if (err) throw err;
        });
        res.send('user deleted');
    });
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`Error: ${err.stack}`);
    res.status(500).send(`[Error occured]:${err.stack}`);
})

app.listen(port, () => {
    console.log('Server is running');
})
module.exports = app;