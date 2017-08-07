var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpack = require('webpack');


module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: ""
    },
    node: {
        fs: 'empty'
    },
    module: {
        // rules: [
        //     {
        //         test: /\.(js|jsx)$/,
        //         use: 'babel-loader'
        //     },
        //     {test: /.css$/, use: ['style-loader', 'css-loader']}
        // ]
        // },
        // devServer: {
        //     historyApiFallback: true
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
        ]
    },
    // resolve: {
    //     modulesDirectories: ['node_modules']
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html/index.html'
        }),
        new webpack.ProvidePlugin({
            'ReactDOM': 'react-dom',
            'React': 'react',
            'PropTypes': 'prop-types'
        }),
        //new BundleAnalyzerPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"'
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: true,
        //     compress: {
        //         warnings: false, // Suppress uglification warnings
        //         pure_getters: true,
        //         unsafe: true,
        //         unsafe_comps: true,
        //         screw_ie8: true
        //     },
        //     output: {
        //         comments: false,
        //     },
        //     exclude: [/\.min\.js$/gi] // skip pre-minified libs
        // }),
        // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])
    ]
}
;
