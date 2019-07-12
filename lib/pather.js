/* jshint esversion : 6, node: true */
'use strict';

const path = require('path');
const cwd = process.cwd() + path.sep;

module.exports = function (pathToResolve) {
    return path.resolve(cwd, pathToResolve);
};