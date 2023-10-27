const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Change to production when ready
    devtool: false,
    devServer: {
        static: './dist',
    },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    /*
    optimization: {
      minimizer: [
        new CssMinimizer(),
        '...', // extend existing minimizers (i.e. `terser-webpack-plugin`)
      ],
    },
    */
};