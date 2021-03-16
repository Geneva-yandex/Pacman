import fs from 'fs';
import path from 'path';
import https from 'https';
import express, {Request} from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import {render} from './middlewares';
import {ResponseWithRender} from './types';
import routes from '../src/pages/index';
import auth from './middlewares/auth';
import router from './routes';

const app = express();

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(morgan('tiny'))
    .use(cookieParser())
    .use(compression())
    .use(express.json())
    .use('/', express.static(path.join(__dirname, 'public')))
    .use(render)
    .use(router);

routes.forEach(r => {
    app.get(r.path, auth, (_req: Request, res: ResponseWithRender) => {
        res.renderBundle();
    });
});

export const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
    },
    app
);

export default app;
