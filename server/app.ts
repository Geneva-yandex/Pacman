import path from 'path';
import express, {Request} from 'express';
import compression from 'compression';
import morgan from 'morgan';
import {render} from './middlewares';
import {ResponseWithRender} from './types';
import routes from '../src/pages/index';
import router from '../src/backend/routes';

const app = express();

app
    .use(morgan('tiny'))
    .use(compression())
    .use('/', express.static(path.join(__dirname, 'public')))
    .use(render)
    .use(router);

routes.forEach(r => {
    app.get(r.path, (_req: Request, res: ResponseWithRender) => {
        res.renderBundle();
    });
});

export default app;
