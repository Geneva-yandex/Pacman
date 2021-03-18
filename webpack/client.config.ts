import {PATHS} from './consts';
import jsLoader from './loaders/js';
import cssLoader from './loaders/css';
import scssLoader from './loaders/scss';
import imagesLoader from './loaders/images';
import fontsLoader from './loaders/fonts';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {InjectManifest} from 'workbox-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

const getClientConfig = (env: any) => {
    const isDevelopment = env.NODE_ENV === 'development';
    const isApiDev = env.DEV === 'api';

    return {
        target: 'web',
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            bundle: [
                isDevelopment && !isApiDev && 'css-hot-loader/hotModuleReplacement',
                isDevelopment && !isApiDev && 'webpack-hot-middleware/client?path=/__webpack_hmr',
                path.join(PATHS.src, 'index')
            ].filter(Boolean)
        },
        output: {
            filename: '[name].js',
            path: path.join(PATHS.dist, 'public'),
            publicPath: '/'
        },
        devtool: isDevelopment ? 'source-map' : false,
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin()
            ]
        },
        module: {
            rules: [
                jsLoader().client,
                cssLoader().client,
                scssLoader().client,
                fontsLoader().client,
                imagesLoader().client
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
                store: `${PATHS.src}/store`,
                'react-dom': '@hot-loader/react-dom'
            }
        },
        plugins: [
            isDevelopment && !isApiDev && new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    {from: path.join(PATHS.public, 'fonts'), to: './fonts'},
                    {from: path.join(PATHS.public, 'images'), to: './images'},
                    {from: path.join(PATHS.public, 'sounds'), to: './sounds'},
                    {from: path.join(PATHS.public, 'offline.html'), to: '.'}
                ]
            }),
            new MiniCssExtractPlugin({
                filename: 'index.css'
            }),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV),
            }),
            !isDevelopment && new InjectManifest({
                swSrc: path.join(PATHS.src, 'sw.ts'),
                swDest: 'sw.js',
                exclude: [
                    /\.gitempty$/
                ]
            })
        ].filter(Boolean),
        watch: isDevelopment && !isApiDev,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    };
};

export default getClientConfig;
