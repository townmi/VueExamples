/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');
const argv = require('yargs').argv;
var vue = require("vue-loader");

const debug = require('debug')('app:webpack:config');


const config = {
    dev: process.env.NODE_ENV || 'development'
};

config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
    '__DEV__': process.env.NODE_ENV === "development",
    '__PROD__': process.env.NODE_ENV === "production",
    '__TEST__': process.env.NODE_ENV === "test",
    '__COVERAGE__': !argv.watch && config.env === 'test',
    '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
};

const __DEV__ = process.env.NODE_ENV === "development";
const __PROD__ = process.env.NODE_ENV === "production";
const __TEST__ = process.env.NODE_ENV === "test";

function base() {
    const args = [path.resolve(__dirname, '.')].concat([].slice.call(arguments));
    return path.resolve.apply(path, args)
}

config.paths = {
    client: base.bind(null, 'src'),
    build: base.bind(null, 'dist')
};

const webpackConfig = {
    name: 'client',
    target: 'web',
    devtool:  __PROD__ ? false : 'source-map',
    resolve: {
        root: base('src'),
        extensions: ['', '.js', '.vue', '.json']
    },
    module: {
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: ['css-loader', 'sass-loader', 'postcss-loader'] }),
        }
    }
};

const APP_ENTRY = config.paths.client('app.js');

webpackConfig.entry = {
    app: __DEV__ ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=/__webpack_hmr`) : [APP_ENTRY]
};

webpackConfig.output = {
    filename: `[name].[hash].js`,
    path: config.paths.build(),
    publicPath: '/'
};

webpackConfig.plugins = [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
        template: config.paths.client('index.html'),
        hash: false,
        // favicon: base('static/favicon.ico'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true
        }
    })
];

webpackConfig.module.loaders = [{
    test: /\.(js)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: ['es2015']
    }
}, {
    test: /\.json$/,
    loader: 'json'
}];

webpackConfig.module.loaders.push({
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader'
        }
    }
});

webpackConfig.module.loaders.push({
    test: /\.css$/,
    loader: 'style!css!sass'
});


module.exports = webpackConfig;