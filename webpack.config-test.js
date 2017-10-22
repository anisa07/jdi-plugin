var nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'chai': 'chai',
            // 'assert': 'chai.assert',
            // 'expect': 'chai.expect'
        })
    ]
};