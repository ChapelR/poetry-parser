'use strict';

const jetpack = require('fs-jetpack');
const pathfinder = require('./pather.js');

module.exports = function (saveToPath, data) {
    jetpack.write(pathfinder(saveToPath), data, {
        atomic : true,
        jsonIndent : 4
    });
};