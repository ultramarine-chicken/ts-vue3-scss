const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/ts/script.ts',
    output: {
        filename: 'script.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    }
};