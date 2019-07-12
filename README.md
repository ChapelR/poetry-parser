# Poetry Parser

**Warning**: Unfinished.

Command line tool for serializing poetry in a simple markup format into JSON data so that you can do weird things with it.

## Install

`npm intall -g poetry-parser`

## Usage

`poetry -i src/poems -o dist/poems.json`

`-i` / `--input`: Required. A directory or file containing poems in the markup form defined below. If a directory, attempts to recursively parse `.txt` and `.md` files.

`-o` / `--output`: Optional. Save the json output to the indicated file. If not provided the output will get logged.

## Module usage:

```javascript
const poetry = require('poetry-parser');

poetry(input, output);
```

## What it does:

Accepts poetry in the form:

```
---
poet: Emily Dickinson
year: 1924
title: I died for beauty, but was scarce
---
I died for beauty, but was scarce   
Adjusted in the tomb,   
When one who died for truth was lain    
In an adjoining room.   
  
He questioned softly why I failed?
"For beauty," I replied.    
"And I for truth,--the two are one;  
We brethren are," he said.  
  
And so, as kinsmen met a night, 
We talked between the rooms,
Until the moss had reached our lips,    
And covered up our names.
```

And parses it into the following JSON:
```
[
    {
        "content": [
            [
                "I died for beauty, but was scarce",
                "Adjusted in the tomb,",
                "When one who died for truth was lain",
                "In an adjoining room."
            ],
            [
                "He questioned softly why I failed?",
                "&ldquo;For beauty,&rdquo; I replied.",
                "&ldquo;And I for truth,&mdash;the two are one;",
                "We brethren are,&rdquo; he said."
            ],
            [
                "And so, as kinsmen met a night,",
                "We talked between the rooms,",
                "Until the moss had reached our lips,",
                "And covered up our names."
            ]
        ],
        "data": {
            "poet": "Emily Dickinson",
            "year": 1924,
            "title": "I died for beauty, but was scarce",
            "stanzas": 3,
            "lines": 12
        }
    }
]
```

You can have multiple poems in the same file; separate them with three or more hashes (`###`) all on the same line by themselves. The resulting JSON will be an array of all parsed poems, each poem will be a JSON object containing a `data` object with the poem's meta data (poet, year, and title must be provided as yaml front matter in each poem, the rest will be calculated), and a `content` property that will contain an array of stanzas each of which will contain an array of lines.

Normal 'boring' straight quotes (", ') will get replaced by html typographic quote entities (&ldquo;, &lsquo;), and double-hyphens (--) will be replaced by m-dashes (&mdash;).

## Why

To make it easy to store some poems as JSON, as I want to host a bunch of JSON poem files and pull from them at random for a project I'm doing, and splitting the files up this way makes that easy to do in a web page with styling and such. Creating the poem markup files also shouldn't take too terribly long this way&mdash;it'll be far faster than hand-writing the JSON or something. Probably not super useful for others, but I thought someone somewhere may be, like me, looking for something like this, so here it is.

## Warning

It is illegal to take and republish poetry you don't own unless it's public domain (~70 years for older poems, but some newer ones are also released into the public domain), creative commons (assuming you follow the conditions laid out in the license), or you have express permission from the rights holder (usually the author of the poem, occasionally an estate or publisher). Don't go making random poem websites with stolen poems!