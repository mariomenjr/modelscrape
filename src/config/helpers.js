"use strict";

const config = require("./config");

/**
 * URL maker. It will automatically implement the configuration found in the config folder.
 * Since it is a closure based function, you can overwrite the default configuration when making a URL.
 *
 * - Normal Usage:
 * > `makeUrl()('endpoint-string')`
 * - Custom Usage:
 * > `makeUrl({domain: 'www.google.com', protocol: 'https'})('search?q=blabla')`
 *
 * @param {Object} params - { domain: String, protocol: String }
 * @returns {Function} URL maker
 */
function makeUrl(
    params = {
        domain: config.ROOT_DOMAIN,
        protocol: config.ROOT_PROTOCOL
    }
) {
    return endpoint => `${params.protocol}://${params.domain}/${endpoint}`;
}

module.exports = { makeUrl };
