import express, {Request} from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './router';
import compression from 'compression';
import {render} from './middlewares';
import {ResponseWithRender} from './types';
import routes from '../src/pages/index';
import sequelize from './db/models';

sequelize.authenticate()
    .then(() => console.log('Postgres successful connection'))
    .catch(err => console.error('Postgres connection error:', err));

mongoose.connect(process.env.DATABASE_MONGO_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('error', err => console.error('Mongo connection error:', err));
mongoose.connection.once('open', () => console.log('Mongo successful connection'));

const app = express();

app
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(compression())
    .use(router)
    .use(render);

routes.forEach(r => {
    app.get(r.path, (_req: Request, res: ResponseWithRender) => {
        res.renderBundle();
    });
});





export {app, sequelize};
