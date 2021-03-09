const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export default () => {
    const reg = /\.css$/;

    return {
        client: {
            test: reg,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        server: {
            test: reg,
            loader: 'null-loader',
        }
    }
}
