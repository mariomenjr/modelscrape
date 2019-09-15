"use strict";

const { makeUrl, makePage } = require("./helpers");
const { PAGES_COLLECTION } = require("./config");

module.exports = {
  URLS: {
    listRepresentatives: makeUrl()("diputados")
  },
  PAGES: PAGES_COLLECTION
};
