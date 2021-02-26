export default () => {
    const config = {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
            'ts-loader'
        ],
    };

    return {
        client: config,
        server: config,
    }
}
