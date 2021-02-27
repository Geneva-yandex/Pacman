import path from 'path';
import express, {Request} from 'express';
import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import mongoose from 'mongoose';

import compression from 'compression';
import {render} from './middlewares';
import {ResponseWithRender} from './types';
import routes from '../src/pages/index';

const sequelizeOptions: SequelizeOptions = {
    host: 'postgres',
    port: 5433,
    username: 'postgres',
    password: 'newPassword',
    database: 'packman',
    dialect: 'postgres'
};

const sequelize = new Sequelize(sequelizeOptions);

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
    .use(compression())
    .use('/', express.static(path.join(__dirname, 'public')))
    .use(render);

routes.forEach(r => {
    app.get(r.path, (_req: Request, res: ResponseWithRender) => {
        res.renderBundle();
    });
});

export default app;
