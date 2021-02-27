import path from 'path';
import express from 'express';
import compression from 'compression';
import serverRenderMiddleware from './server-render-middleware';
import router from './backend/routes';

const app = express();

app
    .use(compression())
    .use(express.json())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(router)
    .get('/*', serverRenderMiddleware);

export {
    app
};
