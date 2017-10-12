var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        //['eslint-loader','babel-eslint','eslint-plugin-react']

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

        // preLoaders: [
        //     // Javascript
        //     { test: /\.jsx?$/, loader: ['eslint-loader','babel-eslint','eslint-plugin-react'], exclude: /node_modules/ }
        // ],
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    fix: true,
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',

                    // Could also be write as follow:
                    // use: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'postcss-loader'
                    ]
                }),
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',

                    // Could also be write as follow:
                    // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
                }),
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
        ],
        // loaders: [{
        //     test: /\.jsx?$/,
        //     exclude: /node_modules/,
        //     loader: 'babel-loader',
        //     query: {
        //         presets: ['react', 'es2015']
        //     }
        //     },
        //     {
        //         test: /\.css$/,
        //         exclude: /node_modules/,
        //         use: ExtractTextPlugin.extract({
        //             fallback: 'style-loader',
        //
        //             // Could also be write as follow:
        //             // use: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        //             use: [
        //                 {
        //                     loader: 'css-loader',
        //                     query: {
        //                         modules: true,
        //                         localIdentName: '[name]__[local]___[hash:base64:5]'
        //                     }
        //                 },
        //                 'postcss-loader'
        //             ]
        //         }),
        //     },
        //     {
        //         test: /\.scss$/,
        //         exclude: /node_modules/,
        //         use: ExtractTextPlugin.extract({
        //             fallback: 'style-loader',
        //
        //             // Could also be write as follow:
        //             // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
        //             use: [
        //                 {
        //                     loader: 'css-loader',
        //                     query: {
        //                         modules: true,
        //                         sourceMap: true,
        //                         importLoaders: 2,
        //                         localIdentName: '[name]__[local]___[hash:base64:5]'
        //                     }
        //                 },
        //                 'sass-loader'
        //             ]
        //         }),
        //     },
        //     {
        //         test: /\.jpg$/,
        //         loader: "file-loader"
        //     },
        //     {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
        // ]
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
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({ filename: 'app/style/style.css', disable: false, allChunks: true })
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
};
