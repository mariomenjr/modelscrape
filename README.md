# modelscrape

Cheerio-based scraping helper to scrape websites based on models/templates.

## Features

-   Template based scraping.
-   Multiple entity definition in a single template.

## Installing

Using npm:

```bash
$ npm install modelscrape
```

or from github:

```bash
$ npm install mariomenjr/modelscrape
```

## Example

Basic usage:

```js
const modelscrape = require("modelscrape");

// Using pre-loaded template
modelscrape()
    .then((collection) => {
        console.log(collection);
    })
    .catch((error) => {
        console.error(error);
    });

// Using custom template
modelscrape({
    url: "https://google.com",
    queryObjects: [
        {
            name: "PupusasSearch",
            endpoint: "search?q=pupusas",
            collections: [
                {
                    name: "Search",
                    query: ".ZINbbc > .kCrYT",
                    props: [
                        {
                            name: "title",
                            query: "a > div.vvjwJb",
                        },
                        {
                            name: "url",
                            query: "a > div.UPmit",
                        },
                    ],
                },
            ],
        },
    ],
})
    .then((collection) => {
        return console.log(collection);
    })
    .catch((error) => {
        return console.error(error);
    });
```
