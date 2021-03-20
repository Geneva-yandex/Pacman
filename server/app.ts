import fs from 'fs';
import path from 'path';
import https from 'https';
import express, {Request} from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
const expressJSDocSwagger = require('express-jsdoc-swagger');

import {getWebpackMiddlewares} from './middlewares/hot';
import auth from './middlewares/auth';
import render from './middlewares/render';
import {ResponseWithRender} from './types';
import routes from '../src/pages/index';
import router from './routes';

const app = express();

const isApiDev = process.env.DEV === 'api';
const isDevelopment = process.env.NODE_ENV === 'development';
const webpackMiddlewares = (!isApiDev && isDevelopment && getWebpackMiddlewares()) || [];

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(morgan('tiny'))
    .use(cookieParser())
    .use(compression())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(express.json())
    .use('/', express.static(path.join(__dirname, 'public')))
    .use([...webpackMiddlewares, render])
    .use(router);

const options = {
    info: {
        version: '1.0.0',
        title: 'Pacman',
        description: 'Packman Game by Yandex Geneva Inc.'
    },
    filesPattern: './*.js',
    baseDir: __dirname,
    apiDocsPath: '/api-docs'
};

expressJSDocSwagger(app)(options);

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
