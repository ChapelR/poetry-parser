'use strict';

const jetpack = require('fs-jetpack');
const pathfinder = require('./pather.js');

module.exports = function (saveToPath, data) {
    /* istanbul ignore if */
    if (!data || typeof data !== 'object') {
        throw new Error('Unspecified internal error. Please open an issue at https://github.com/ChapelR/poetry-parser/issues.');
    }
    jetpack.write(pathfinder(saveToPath), data, {
        atomic : true,
        jsonIndent : 4
    });
};