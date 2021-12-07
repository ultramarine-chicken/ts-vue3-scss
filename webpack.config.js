const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/js/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, 'src/style/global.scss')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    //vueをtypescriptとして監視する
                    appendTsSuffixTo: [/\.vue$/]
                  }
            }
        ]
    },
    cache: false,
    resolve: {
        extensions: [
            '.ts'
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
};