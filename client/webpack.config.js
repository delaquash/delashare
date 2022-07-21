const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    // resolve: {
    //     extensions: ['.js', '.jsx']
    // },
    devServer : {
        // inline: false,
        port: 3000,
        // watchContentBase : true
    },
    module : {
        rules : [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                    loader:"babel-loader",
               
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            }
        ]
    }
}