"use strict";

const config = require("./config");

function makeUrl(
  params = {
    domain: config.ROOT_DOMAIN,
    protocol: config.ROOT_PROTOCOL
  }
) {
  return endpoint => `${params.protocol}://${params.domain}/${endpoint}`;
}

module.exports = { makeUrl };
