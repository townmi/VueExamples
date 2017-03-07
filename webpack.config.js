/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
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
    '__DEV__': config.env === 'development',
    '__PROD__': config.env === 'production',
    '__TEST__': config.env === 'test',
    '__COVERAGE__': !argv.watch && config.env === 'test',
    '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
};

const __DEV__ = config.globals.__DEV__;
const __PROD__ = config.globals.__PROD__;
const __TEST__ = config.globals.__TEST__;

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
    devtool: 'source-map',
    resolve: {
        root: base('src'),
        extensions: ['', '.js', '.vue', '.json']
    },
    module: {
        preLoaders: [
            {
                test: /\.vue$/,
                loader: 'eslint',
                include: '../',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint',
                include: '../',
                exclude: /node_modules/
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};

rimraf(config.paths.build(), function () {
    console.log(arguments)
});

const APP_ENTRY = config.paths.client('app.js');

webpackConfig.entry = {
    app: __DEV__ ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=/__webpack_hmr`) : [APP_ENTRY],
    vendor: [
        'vue'
    ]
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
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // new webpack.DefinePlugin({
    //     'process.env': "env"
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     },
    //     sourceMap: true
    // })
];

const BASE_CSS_LOADER = 'css?sourceMap&-minimize';

webpackConfig.module.loaders = [{
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0']
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
            js: 'babel?presets=es2015'
        }
    }
});

webpackConfig.module.loaders.push({
    test: /\.scss$/,
    exclude: null,
    loaders: [
        'style',
        BASE_CSS_LOADER,
        'postcss',
        'sass?sourceMap'
    ]
});

webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: null,
    loaders: [
        'style',
        BASE_CSS_LOADER,
        'postcss'
    ]
});

webpackConfig.postcss = [
    cssnano({
        autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions']
        },
        discardComments: {
            removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true
    })
];

module.exports = webpackConfig;