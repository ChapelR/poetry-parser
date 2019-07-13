/* jshint mocha: true */
'use strict';
const assert = require('assert');
const main = require('../index.js');

// fromString()
describe('<poetry>.fromString()', function () {
    const obj = main.fromString("---\n" +
        "poet: Chapel\n" +
        "year: 2019\n" +
        "title: A Shitty Poem\n" +
        "---\n" +
        "Roses are red, violets are blue,\n" +
        "I hope this thing works well and true.\n" +
        "\nIf it does not, I'll cry,\n" +
        "And then I'll go write more code until I die.");
    it('should parse a poetry string and return an object', function () {
        assert.strictEqual(typeof obj, 'object');
    });
    it('should have parsed YAML front-matter', function () {
        assert.strictEqual(obj[0].data.poet, 'Chapel');
    });
    it('break the poem into stanzas', function () {
        assert.strictEqual(obj[0].content.length, 2);
    });
    it('break each stanza into lines', function () {
        assert.strictEqual(obj[0].content[0].length, 2);
    });
    it('not change any of the text outside html entities', function () {
        assert.strictEqual(obj[0].content[0][0].trim(), 'Roses are red, violets are blue,');
    });
});

// fromFile()
describe('<poetry>.fromFile()', function () {
    const poetry = main.fromFile('./test/src/poem.txt');
    it('should parse the file into an array', function () {
        assert.strictEqual(typeof poetry, 'object');
    });
    it('should be able to parse multiple poems in a single file', function () {
        assert.strictEqual(poetry.length, 2);
    });
    it('should have parsed YAML front-matter', function () {
        assert.strictEqual(poetry[0].data.year, 1924);
    });
    it('break each poem into stanzas', function () {
        assert.strictEqual(poetry[0].content.length, 3);
    });
    it('break each stanza into lines', function () {
        assert.strictEqual(poetry[1].content[3].length, 2);
    });
    it('not change any of the text outside html entities', function () {
        assert.strictEqual(poetry[1].content[1][1].trim(), 'And often is his gold complexion dimmed;');
    });
});

// parseAndSave()
describe('<poetry>.parseAndSave()', function () {
    main.parseAndSave('./test/src/poem2.txt', './test/dist/poem.json');
    const poetry = require('./dist/poem.json');
    it('should parse the file into an json file', function () {
        assert.strictEqual(typeof poetry, 'object');
    });
    it('should have parsed YAML front-matter', function () {
        assert.strictEqual(poetry[0].data.year, 1923);
    });
    it('break each poem into stanzas', function () {
        assert.strictEqual(poetry[0].content.length, 4);
    });
    it('break each stanza into lines', function () {
        assert.strictEqual(poetry[0].content[3].length, 4);
    });
    it('not change any of the text outside html entities', function () {
        assert.strictEqual(poetry[0].content[1][1].trim(), 'To stop without a farmhouse near');
    });
});

// fileSystemHandling
describe('file system checks', function () {
    const poetry = main.fromFile('./test/src/dir');
    it('should parse poems from both md files and text files in a directory', function () {
        assert.strictEqual(poetry.length, 2);
    });
    it('should produce valid results', function () {
        assert.ok(poetry.some( (p) => p.data.poet.trim() === 'Ben Jonson'));
    });
});

// errors
describe('Error handling.', function () {
    //console.log(main.fromFile('./test/src/empty'));
    it('should recognize and throw on an empty directory', function () {
        assert.throws(() => main.fromFile('./test/src/empty'));
    });
    it('parser should throw an exception when given bad data', function () {
        assert.throws(() => main.fromText(4));
    });
    it('parser should throw an exception when given nonsense file names', function () {
        assert.throws(() => main.fromFile(13));
    });
});