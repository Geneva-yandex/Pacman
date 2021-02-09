import path from 'path';
import express, {Request} from 'express';
import compression from 'compression';
import {render} from './middlewares';
import {ResponseWithRender} from './types';

const app = express();

app
    .use(compression())
    .use(render)
    .use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', (req: Request, res: ResponseWithRender) => {
    console.log(req);
    res.renderBundle();
});

export default app;
