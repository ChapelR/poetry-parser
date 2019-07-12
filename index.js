/* jshint esversion : 6, node: true */
'use strict';

const getFiles = require('./lib/get-files.js');
const parse = require('./lib/parser.js');
const save = require('./lib/save-as.js');

function parsePoetry (text, json) {
    try {
        let data = parse(text);
        if (json) {
            data = JSON.stringify(data, null, 4);
        }
        return data;
    } catch (err) {
        console.error(err.message);
    }
}

function parseFromFile (input, json) {
    try {
        let data = parsePoetry(getFiles(input), json);
        return data;
    } catch (err) {
        console.error(err.message);
    }
}

function parseAndSave (input, output) {
    try {
        const data = parseFromFile(input);
        if (output) {
            save(output, data);
        } else {
            console.log(data);
        }
        return data;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    fromString : parsePoetry,
    fromFile : parseFromFile,
    parseAndSave
};