import 'reflect-metadata'
import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import { userRouter } from './routes/users.routes'
import { postRouter } from './routes/posts.routes'

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.SERVER_PORT);

app.use(express.json())
app.use(express.urlencoded())

app.use('/users', userRouter)
app.use('/posts', postRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`${err.stack}`);
    res.status(err.status ? err.status : 500).send(`[Error occured]:${err.stack}`);
})

app.listen(port, () => {
    console.log('Server is running');
})
module.exports = app;