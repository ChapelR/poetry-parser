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
    if (pathIs === 'dir') {
        return getTextFiles(path).concat(getMDFiles(path));
    } else if (pathIs === 'file') {
        return [path];
    }
    return null;
}

function getContent (array) {
    if (!array) {
        console.warn('no poems found');
        return [];
    }
    return array.map( function (file) {
        return jetpack.read(file, 'utf8');
    });
}

module.exports = function (path) {
    return getContent(checkPath(pathfinder(path)));
};