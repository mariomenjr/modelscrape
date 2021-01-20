"use strict";

/**
 * The default template object to fetch information from a website
 */
const ENTITY_SAMPLE = {
    name: "itemsFound",
    query: ".ZINbbc > .kCrYT",
    attrs: [],
    props: [
        {
            name: "itemTitle",
            query: "a > div.vvjwJb",
            attrs: []
        },
        {
            name: "itemUrl",
            query: "a > div.UPmit",
            attrs: []
        }
    ]
};

module.exports = {
    /**
     * The domain part of the URL. Sample: www.google.com
     */
    ROOT_DOMAIN: "www.google.com",
    /**
     * The protocol part of a URL. Sample http or https
     */
    ROOT_PROTOCOL: "https",

    /**
     * A collection of templates objects to fetch information from a website
     */
    PAGES_COLLECTION: [
        {
            name: "main",
            endpoint: "search?q=javascript",
            collections: [ENTITY_SAMPLE]
        }
    ]
};
