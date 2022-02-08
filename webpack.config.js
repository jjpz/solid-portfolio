const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/script.js'
    },
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /nodeModules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
    }
};