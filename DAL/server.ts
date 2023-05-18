import 'reflect-metadata'
import express, { Express, Request, Response, NextFunction } from 'express';
import { router as urouter } from './routes/users.routes'
import { router as prouter } from './routes/posts.routes'

const app: Express = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded())

app.use('/', urouter)
app.use('/', prouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`${err.stack}`);
    res.status(500).send(`[Error occured]:${err.stack}`);
})

app.listen(port, () => {
    console.log('Server is running');
})
module.exports = app;