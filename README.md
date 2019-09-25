# Scrappity

Cheerio-based scrapping `helper` to create entities out of the target via JSON templates.

## Features

-   Template based definition of an entity
-   Multiple entity definition in a single template

## Nodejs support

Build on top of NodeJS v12.10.0.

> **WARNING**: `NOT` TESTED ON PREVIOUS VERSIONS.

## Installing

Using npm:

```bash
$ npm install scrappity
```

or from github:

```bash
$ npm install mariomenjr/scrappity
```

## Example

Basic usage:

```js
const scrappity = require("scrappity");

// Using pre-loaded template
scrappity()
    .then(collection => {
        console.log(collection);
    })
    .catch(error => {
        console.error(error);
    });
```
