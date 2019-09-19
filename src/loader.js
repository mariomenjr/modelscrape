'use strict';

const trae = require("trae");
const cheerio = require("cheerio");

module.exports = async ({ url, queryObj }) => {
  try {
    const resp = await trae.get(url);
    const html = resp.data;

    const $ = cheerio.load(html);

    return "Ok";
  } catch (error) {
    return error;
  }
  // Sent back a report of what happened
};
