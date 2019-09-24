"use strict";

const { loader, config } = require("./src");

// Use a nice table to print the report or error
module.exports = (
    scrapperObj = {
        url: `http://google.com`,
        pages: config.PAGES_COLLECTION
    }
) => {
    return loader(scrapperObj);
};
