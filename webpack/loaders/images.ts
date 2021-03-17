export default () => {
    const reg = /\.(png|jpe?g|svg)$/i;

    return {
        client: {
            test: reg,
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
        server: {
            test: reg,
            loader: 'null-loader',
        }
    }
}
