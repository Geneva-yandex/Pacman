const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export default () => {
    const reg = /\.scss$/;

    return {
        client: {
            test: reg,
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
        server: {
            test: reg,
            loader: 'null-loader',
        }
    }
}
