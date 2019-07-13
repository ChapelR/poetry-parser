'use strict';

const getFiles = require('./lib/get-files.js');
const parse = require('./lib/parser.js');
const save = require('./lib/save-as.js');

function attempt (fn) {
    try {
        return fn();
    } catch (err) {
        /* istanbul ignore next */
        throw new Error(err);
    }
}

function parsePoetry (text, json) {
    return attempt( function () {
        let data = parse(text);
        /* istanbul ignore next */
        if (json) {
            data = JSON.stringify(data, null, 4);
        }
        return data;
    });
}

function parseFromFile (input, json) {
    return attempt( function () {
        let data = parsePoetry(getFiles(input), json);
        return data;
    });
}

function parseAndSave (input, output) {
    return attempt( function () {
        const data = parseFromFile(input);
        /* istanbul ignore else */
        if (output) {
            save(output, data);
        } else {
            console.log(data);
        }
        return data;
    });
}

module.exports = {
    fromString : parsePoetry,
    fromFile : parseFromFile,
    parseAndSave
};