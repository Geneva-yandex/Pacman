import {RequestHandler} from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfigs from '../../../webpack/client.config';

import render from './render';

function getWebpackMiddlewares(config: any): RequestHandler[] {
    const _config = config(process.env);
    const compiler = webpack({..._config, mode: 'development'});

    return [
        devMiddleware(compiler, {
            publicPath: _config.output!.publicPath! as string
        }),
        hotMiddleware(compiler, {path: '/__webpack_hmr'})
    ];
}

export default [
    ...getWebpackMiddlewares(webpackConfigs),
    render
];
