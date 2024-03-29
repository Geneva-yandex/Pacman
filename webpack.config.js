const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

const PATHS = {
    dist: path.resolve(__dirname, 'dist'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public')
};

module.exports = env => {
    const isDevelopment = env.NODE_ENV === 'development';

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            bundle: [
                isDevelopment && 'webpack-dev-server/client',
                isDevelopment && 'webpack/hot/dev-server',
                './src/index.tsx'
            ].filter(Boolean)
        },
        output: {
            filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
            path: PATHS.dist,
            publicPath: '/'
        },
        devServer: {
            host: '0.0.0.0',
            hot: true,
            contentBase: PATHS.dist,
            port: 4000,
            publicPath: '/',
            historyApiFallback: true
        },
        devtool: isDevelopment ? 'source-map' : false,
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin()
            ],
            runtimeChunk: 'single',
            splitChunks: {
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        priority: 1
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: [
                        'ts-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
                },
                {
                    test: /\.ttf$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }
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
        plugins: [
            new CleanWebpackPlugin(),
            isDevelopment && new webpack.HotModuleReplacementPlugin(),
            new CopyPlugin({
                patterns: [
                    {from: './public/fonts', to: './fonts'},
                    {from: './public/images', to: './images'},
                    {from: './public/offline.html', to: './'},
                ]
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? 'index.css' : 'index.[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                inject: 'body',
                chunks: ['bundle', 'vendor']
            }),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV)
            }),
            !isDevelopment && new InjectManifest({
                swSrc: './src/sw.ts',
                swDest: 'sw.js',
                exclude: [
                    /\.gitempty$/
                ]
            })
        ].filter(Boolean)
    };
};
