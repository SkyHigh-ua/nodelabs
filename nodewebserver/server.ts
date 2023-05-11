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
import express, { Express, Request, Response, NextFunction } from 'express';
import { router } from './routes/users.routes'

const app: Express = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded())

app.use('/', router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`${err.stack}`);
    res.status(500).send(`[Error occured]:${err.stack}`);
})

app.listen(port, () => {
    console.log('Server is running');
})
module.exports = app;