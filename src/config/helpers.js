"use strict";

const config = require("./config");

/**
 * URL maker. It will automatically implement the configuration found in the config folder.
 * Since it is a closure based function, you can overwrite the default configuration when making a URL.
 *
 * - Normal Usage:
 * > `makeUrl()('endpoint-string')`
 * - Custom Usage:
 * > `makeUrl('https://www.google.com')('search?q=blabla')`
 *
 * @param {Object} params - { domain: String, protocol: String }
 * @returns {Function} URL maker
 */
function makeUrl(domain = `${config.ROOT_PROTOCOL}://${config.ROOT_DOMAIN}`) {
    return endpoint => `${domain}/${endpoint}`;
}

function registerPagesUrl(pagesTemplate) {
    return pagesTemplate.reduce((urls, { endpoint, name }) => {
        urls[name] = makeUrl()(endpoint);
        return urls;
    }, {});
}

module.exports = { makeUrl, registerPagesUrl };
