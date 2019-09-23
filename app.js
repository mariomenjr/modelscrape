"use strict";

const { loader, config } = require("./src");

// Use a nice table to print the report or error
module.exports = (
    params = {
        url: `http://google.com`,
        pages: config.PAGES
    }
) => {
    return loader(params);
};

module
    .exports()
    .then(then => {
        return console.log(then);
    })
    .catch(error => {
        return console.error(error);
    });
