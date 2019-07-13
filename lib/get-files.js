'use strict';

const jetpack = require('fs-jetpack');
const pathfinder = require('./pather.js');

function getTextFiles (path) {
    return jetpack.find(path, {
        matching : '*.txt'
    });
}

function getMDFiles (path) {
    return jetpack.find(path, {
        matching : '*.md'
    }); 
}

function checkPath (path) {
    const pathIs = jetpack.exists(path);
    /* istanbul ignore else */
    if (pathIs === 'dir') {
        return getTextFiles(path).concat(getMDFiles(path));
    }
    /* istanbul ignore else */
    if (pathIs === 'file') {
        return [path];
    }
}

function getContent (array) {
    if (!array || !array.length) {
        throw new Error('No poems found!');
    }
    return array.map( function (file) {
        return jetpack.read(file, 'utf8');
    });
}

module.exports = function (path) {
    return getContent(checkPath(pathfinder(path)));
};