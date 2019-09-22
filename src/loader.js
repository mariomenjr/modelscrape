"use strict";

const trae = require("trae");
const cheerio = require("cheerio");

const { URLS } = require("./config");
const { Entity, Prop } = require("./types");

/**
 * Fetch HTML for PageTemplate
 *
 * @param {PageTemplate} pageTemplate
 * @return PageTemplate
 */
async function fetchHtmlAndAddCheerio(pageTemplate) {
    const url = URLS[pageTemplate.name];
    const resp = await trae.get(url);

    return {
        ...pageTemplate,
        $: cheerio.load(resp.data)
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
    if (!Array.isArray(collection.attrs))
        throw Error("Element.attrs property must be type Array");

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
     * @param {EntityTemplate}
     */
    return function(entityTemplate) {
        const { props, query: entityQuery } = entityTemplate;
        const entityNodes = $(entityQuery);

        return entityNodes
            .map((i, entityNode) => {
                const entityInstance = new Entity({
                    name: entityTemplate.name,
                    query: entityTemplate.query
                });

                entityInstance.attrs = selectNodeAttributes(
                    entityTemplate,
                    entityNode
                );
                entityInstance.props = props.map(propTemplate => {
                    const propNodes = $(propTemplate.query, entityNode);
                    const propsArray = propNodes
                        .map((j, propNode) => {
                            const propInstance = new Prop({
                                name: propTemplate.name,
                                query: propTemplate.query
                            });

                            propInstance.value =
                                propNode.firstChild === null
                                    ? null
                                    : propNode.firstChild.data;
                            propInstance.attrs = selectNodeAttributes(
                                propTemplate,
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
module.exports = async ({ pages }) => {
    try {
        pages = await Promise.all(pages.map(fetchHtmlAndAddCheerio));
        return pages.map(populatePageCollections);
    } catch (error) {
        return error;
    }
    // Sent back a report of what happened
};
