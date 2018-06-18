var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var marked = require('marked');
var renderer = new marked.Renderer();

var DIST = path.resolve(__dirname, 'dist/');
var SRC = path.resolve(__dirname, 'src/');

var config = {
    entry: SRC + '/index.js',
    output: {
        path: DIST,
        publicPath: '/',
        filename: 'app.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(css|scss)$/,
                loaders: [
                    'style-loader', 'css-loader', 'sass-loader'
                ],
                exclude: /node_modules/
            }, {
                test: /plugin\.css$/,
                loaders: ['style-loader','css-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },{
                test: /\.md$/,
                use: 'raw-loader'
                // use: [
                //     {
                //         loader: 'html-loader'
                //     }, {
                //         loader: 'markdown-loader',
                //         options: {
                //             pedantic: true,
                //             renderer
                //         }
                //     }
                // ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html', inject: 'body' })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
}

module.exports = config;