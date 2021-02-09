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
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

const getClientConfig = (env: any) => {
    const isDevelopment = env.NODE_ENV === 'development';

    return {
        target: 'web',
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            bundle: [
                isDevelopment && 'react-hot-loader/patch',
                isDevelopment && 'css-hot-loader/hotModuleReplacement',
                path.join(PATHS.src, 'client')
            ].filter(Boolean)
        },
        output: {
            filename: '[name].js',
            path: PATHS.dist,
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
                api: `${PATHS.src}/api`,
                components: `${PATHS.src}/components`,
                pages: `${PATHS.src}/pages`,
                types: `${PATHS.src}/types`,
                misc: `${PATHS.src}/misc`,
                'react-dom': '@hot-loader/react-dom'
            }
        },
        devServer: {
            port: 9000,
            historyApiFallback: true,
            hot: true
        },
        plugins: [
            isDevelopment && new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                inject: 'body',
                chunks: ['bundle', 'vendor']
            }),
            new CopyPlugin({
                patterns: [
                    {from: path.join(PATHS.public, 'fonts'), to: './fonts'},
                    {from: path.join(PATHS.public, 'images'), to: './images'},
                    {from: path.join(PATHS.public, 'offline.html'), to: './'}
                ]
            }),
            new MiniCssExtractPlugin({
                filename: 'index.css'
            }),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV)
            }),
            !isDevelopment && new InjectManifest({
                swSrc: path.join(PATHS.src, 'sw.ts'),
                swDest: 'sw.js',
                exclude: [
                    /\.gitempty$/
                ]
            })
        ].filter(Boolean)
    };
};

export default getClientConfig;
