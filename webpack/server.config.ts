import {PATHS} from './consts';
import jsLoader from './loaders/js';
import cssLoader from './loaders/css';
import scssLoader from './loaders/scss';
import imagesLoader from './loaders/images';
import fontsLoader from './loaders/fonts';
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CopyPlugin from 'copy-webpack-plugin';

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
                public: PATHS.public,
                api: `${PATHS.src}/api`,
                common: `${PATHS.src}/common`,
                components: `${PATHS.src}/components`,
                pages: `${PATHS.src}/pages`,
                types: `${PATHS.src}/types`,
                store: `${PATHS.src}/store`
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
            }),
            new CopyPlugin({
                patterns: [
                    {from: path.join(PATHS.server, 'cert'), to: './cert'}
                ]
            }),
        ].filter(Boolean),
    };
};

export default getServerConfig;
