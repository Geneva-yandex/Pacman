import {PATHS} from './consts';
import jsLoader from './loaders/js';
import cssLoader from './loaders/css';
import scssLoader from './loaders/scss';
import imagesLoader from './loaders/images';
import fontsLoader from './loaders/fonts';
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const getServerConfig = (env: any) => {
    const isDevelopment = env.NODE_ENV === 'development';

    return {
        target: 'node',
        node: {
            __dirname: false
        },
        mode: isDevelopment ? 'development' : 'production',
        entry: path.join(PATHS.server, 'index'),
        output: {
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            path: PATHS.dist,
            publicPath: '/'
        },
        devtool: isDevelopment ? 'source-map' : false,
        module: {
            rules: [
                jsLoader().server,
                cssLoader().server,
                scssLoader().server,
                fontsLoader().server,
                imagesLoader().server
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                api: `${PATHS.src}/api`,
                components: `${PATHS.src}/components`,
                pages: `${PATHS.src}/pages`,
                types: `${PATHS.src}/types`,
                misc: `${PATHS.src}/misc`
            }
        },
        externals: [
            nodeExternals({
                allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]
            })
        ],
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV)
            })
        ].filter(Boolean)
    };
};

export default getServerConfig;
