# modelscrape

Cheerio-based helper to scrape websites based on models/templates.

## Features

- Model/template based scraping.
- Multiple entity definition in a single template to scrap more than one section at a time.

## Install

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

// To execute the preloaded template
const collection = await modelscrape();

// To execute a custom template
const collection = await modelscrape({
  url: "https://google.com",
  queryObjects: [
    {
      name: "PupusasGoogleSearch",
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
});
```

## License

The source code of this project is under [MIT License](https://opensource.org/licenses/MIT).
