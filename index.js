/* jshint esversion : 6, node: true */
'use strict';

const getFiles = require('./lib/get-files.js');
const parse = require('./lib/parser.js');
const save = require('./lib/save-as.js');

module.exports = function (input, output) {
    try {
        const out = parse(getFiles(input));
        if (output) {
            save(output, out);
        } else {
            console.log(out);
        }
        return out;
    } catch (err) {
        console.error(err);
    }
};