﻿'use strict';

module.exports = config => {
    config.set({
        autoWatch: true,
        browsers: ['Chrome'],
        files: [
            '../node_modules/jquery/dist/jquery.min.js',
            '../node_modules/es6-shim/es6-shim.min.js',
            'karma.entry.js'
        ],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        singleRun: true,
        webpack: require('../webpack.test.js'),
        webpackServer: {
            noInfo: true
        }
    });
};