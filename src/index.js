"use strict";

const trae = require("trae");
const cheerio = require("cheerio");

const { URLS } = require("../config");

module.exports = async () => {
  try {
    const repssUrl = URLS.congressMembers;

    const response = await trae.get(repssUrl);
    const html = response.data;

    const $ = cheerio.load(html);
    const str = $(".diputadoDetalles");

    return "Ok";
  } catch (error) {
    return error;
  }
  // Sent back a report of what happened
};
