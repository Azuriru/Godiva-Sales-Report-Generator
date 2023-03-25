const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, 'output'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: '' }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx']
    },
    devtool: 'source-map'
};