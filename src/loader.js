"use strict";

const trae = require("trae");
const cheerio = require("cheerio");

const { makeUrl } = require("./config");
const { Entity, Prop, Page } = require("./types");

const { validateParam, validateQuery } = require("./utils/validators");

const { AttributeError } = require("./errors");

function fetchHtmlAndAddCheerio(domain) {
    const joinEndpoint = makeUrl(domain);
    /**
     * Fetch HTML for PageTemplate
     *
     * @param {Query} query It delivers the endpoint to be executed for the particular URL
     * @return Page
     */
    return async function(query) {
        const url = joinEndpoint(query.endpoint);
        const resp = await trae.get(url);

        const page = new Page(query);
        page.setCheerio(cheerio.load(resp.data));

        return page;
    };
}

/**
 * Select attributes that have been listed in the Element* template and that are available at the node object
 *
 * @param {ElementEntity[]} collection
 * @param {Node[]} $node
 */
function selectNodeAttributes(collection, $node) {
    if (!collection.hasOwnProperty("attrs")) return null;
    if (!Array.isArray(collection.attrs)) throw AttributeError.mustBeArray();

    return collection.attrs.reduce((attributes, current) => {
        attributes[current] =
            $node.attribs[current] !== undefined
                ? $node.attribs[current]
                : null;
        return attributes;
    }, {});
}

/**
 * Closure for avoiding multiple passing of cheerio object
 *
 * @param {Cheerio} $ Cheerio object after loading data
 * @return Function
 */
function produceEntityCollection($) {
    /**
     * It will extract data from HTML according to queries defined in templates
     *
     * @param {EntityModel}
     */
    return function(entityModel) {
        const { props, query: entityQuery } = entityModel;
        const entityNodes = $(entityQuery);

        return entityNodes
            .map((i, entityNode) => {
                const entityInstance = new Entity({
                    name: entityModel.name,
                    query: entityModel.query
                });

                entityInstance.attrs = selectNodeAttributes(
                    entityModel,
                    entityNode
                );
                entityInstance.props = props.map(propModel => {
                    const propNodes = $(propModel.query, entityNode);
                    const propsArray = propNodes
                        .map((j, propNode) => {
                            const propInstance = new Prop({
                                name: propModel.name,
                                query: propModel.query
                            });

                            propInstance.value =
                                propNode.firstChild === null
                                    ? null
                                    : propNode.firstChild.data;
                            propInstance.attrs = selectNodeAttributes(
                                propModel,
                                propNode
                            );

                            return propInstance;
                        })
                        .get();
                    return propsArray.length > 1 ? propsArray : propsArray[0];
                });
                return entityInstance;
            })
            .get();
    };
}

/**
 * Populates the page template collection with actual page entities
 *
 * @param {PageTemplate} page Page template object
 * @return Array
 */
function populatePageCollections(pageTemplate) {
    const { $, collections } = pageTemplate;
    return collections.map(produceEntityCollection($));
}

/**
 * Loader for scrapper
 * @param {object} {url: string, pages: Array} - Url and Pages template collection
 * @return Promise
 */
module.exports = async param => {
    try {
        const { url, queryObjects: queryArray } = validateParam(param);

        queryArray.forEach(validateQuery);

        const pagesArray = await Promise.all(
            queryArray.map(fetchHtmlAndAddCheerio(url))
        );

        return pagesArray.map(populatePageCollections);
    } catch (error) {
        return error;
    }
    // Sent back a report of what happened
};
