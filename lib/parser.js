/* jshint esversion : 6, node: true */
'use strict';

const matter = require('gray-matter');

// regex
const splitter = /[\n\r]\s*#{3,}\s*[\n\r]/; // ###(...) on own line splits so multiple poems can be in one file
const cr = /\r\n?/g; // replace carriage returns with line feeds to simplify parsing rules
const stanzaBreak = /\n{2,}/; // two or more line feeds = a new stanza
const lineBreak = /\n/; // a single line break = new line
const openQuoteDouble = /([\n\s])"([^\n\s])/g; // open quote has white space/line feed to the left, something on the right
const openQuoteSingle = /([\n\s])'([^\n\s])/g;
const closeQuoteDouble = /([^\n\s])"([\n\s])/g; // close quote is reverse of open
const closeQuoteSingle = /([^\n\s])'([\n\s])/g;
const apos = /'/g; // apostrophe is any single quote that's left after getting rid of the quotes
const dash = /--/g; // two hyphens is an m-dash

function splitUpFiles (array) {
    let poems = [];
    if (typeof array === 'string') {
        array = [array];
    }
    array.forEach( function (content) {
        let parts = content.split(splitter);
        poems = poems.concat(parts.filter( function (p) {
            return p && typeof p === 'string' && p.trim();
        }));
    });
    return poems;
}

function parseFrontMatter (poem) {
    let ret = matter(poem.trim());
    delete ret.orig;
    delete ret.excerpt;
    delete ret.isEmpty;
    return ret;
}

function parsePoem (poemObject) {
    let content = poemObject.content;
    content = content
        // carriage return -> line feed
        .replace(cr, '\n')
        // quotes
        .replace(openQuoteDouble, `$1&ldquo;$2`)
        .replace(closeQuoteDouble, `$1&rdquo;$2`)
        .replace(openQuoteSingle, `$1&lsquo;$2`)
        .replace(closeQuoteSingle, `$1&rsquo;$2`)
        // apostrophe and m-dashes
        .replace(apos, '&apos;')
        .replace(dash, '&mdash;');

    const stanzas = content.split(stanzaBreak).filter( function (stan) {
        return stan && typeof stan === 'string' && stan.trim();
    });
    let lines = 0;
    poemObject.content = stanzas.map( function (stan) {
        let linesInThisStanza = stan.split(lineBreak).filter( function (l) {
            return l && typeof l === 'string' && l.trim();
        });
        lines += linesInThisStanza.length;
        return linesInThisStanza;
    });
    Object.assign(poemObject.data, {
        stanzas : stanzas.length,
        lines : lines
    });
    return poemObject;
}

module.exports = function (array) {
    let poems = splitUpFiles(array);
    return poems.map( function (poem) {
        return parsePoem(parseFrontMatter(poem));
    });
};