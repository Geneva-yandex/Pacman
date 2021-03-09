
export default () => {
    const reg = /\.ttf$/;

    return {
        client: {
            test: reg,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
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
