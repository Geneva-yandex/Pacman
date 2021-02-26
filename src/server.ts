import path from 'path';
import express from 'express';
import compression from 'compression';
import serverRenderMiddleware from './server-render-middleware';
import mongoose from 'mongoose';
import {Sequelize, SequelizeOptions} from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
    host: 'postgres',
    port: 5432,
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
    .use(express.static(path.resolve(__dirname, '../dist')))
    .get('/*', serverRenderMiddleware);

export {
    app
};
