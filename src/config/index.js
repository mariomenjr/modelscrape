"use strict";

const { makeUrl, registerPagesUrl } = require("./helpers");
const { PAGES_COLLECTION: PAGES } = require("./config");

const URLS = registerPagesUrl(PAGES);

module.exports = { URLS, PAGES };
