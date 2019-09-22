"use strict";

const { makeUrl } = require("./helpers");
const { PAGES_COLLECTION: PAGES } = require("./config");

const URLS = PAGES.reduce((urls, { endpoint, name }) => {
    urls[name] = makeUrl()(endpoint);
    return urls;
}, {});

module.exports = { URLS, PAGES };
