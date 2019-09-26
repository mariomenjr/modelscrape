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
