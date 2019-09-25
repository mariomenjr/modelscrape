"use strict";

const { loader, config } = require("./src");

// Use a nice table to print the report or error
module.exports = (
    pageTemplate = {
        url: `http://google.com`,
        /**
         * @type {Object[]}
         */
        queryObjects: config.PAGES_COLLECTION
    }
) => {
    return loader(pageTemplate);
};

module
    .exports({
        url: "https://google.com",
        queryObjects: [
            {
                name: "JavascriptSearch",
                endpoint: "search?q=javascript",
                collections: [
                    {
                        name: "Search",
                        query: ".ZINbbc > .kCrYT",
                        props: [
                            {
                                name: "title",
                                query: "a > div.vvjwJb"
                            },
                            {
                                name: "url",
                                query: "a > div.UPmit"
                            }
                        ]
                    }
                ]
            },
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
                                query: "a > div.vvjwJb"
                            },
                            {
                                name: "url",
                                query: "a > div.UPmit"
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(collection => {
        return console.log(collection);
    })
    .catch(error => {
        return console.error(error);
    });
