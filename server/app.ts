import path from 'path';
import express, {Request} from 'express';
import compression from 'compression';
import {render} from './middlewares';
import {ResponseWithRender} from './types';
import routes from '../src/pages/index';

const app = express();

app
    .use(compression())
    .use('/', express.static(path.join(__dirname, 'public')))
    .use(render);

routes.forEach(r => {
    app.get(r.path, (_req: Request, res: ResponseWithRender) => {
        res.renderBundle();
    });
});

export default app;
