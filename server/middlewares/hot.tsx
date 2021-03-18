import {RequestHandler} from 'express';
import webpack, {Configuration} from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack/client.config';

export function getWebpackMiddlewares(): RequestHandler[] {
    const config = webpackConfig(process.env) as Configuration;
    const compiler = webpack({...config, mode: 'development'});

    return [
        devMiddleware(compiler, {
            publicPath: config.output!.publicPath! as string,
            serverSideRender: true,
            writeToDisk: true,

        }),
        hotMiddleware(compiler, {path: '/__webpack_hmr'})
    ];
}
