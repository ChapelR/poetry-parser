#! /usr/bin/env node
/* jshint node: true, esversion: 6 */

const yargs = require('yargs'),
       main = require('../index.js').parseAndSave;

let args = yargs.option('input', {
    describe : 'The file or directory to parse for poems.',
    alias : 'i',
    type : 'string'
})
.option('output', {
    describe : 'The file to save the JSON poems to.',
    alias : 'o',
    type : 'string'
})
.demandOption(['input'], 'Please provide at least an input file.')
.help()
.argv;

main(args.input, args.output || null);