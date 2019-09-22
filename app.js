"use strict";

const { loader, config } = require("./src");

// Use a nice table to print the report or error
module.exports = Promise.all([
    loader({
        pages: config.PAGES
    })
]);

module.exports
    .then(then => {
        return console.log(then);
    })
    .catch(error => {
        return console.error(error);
    });
