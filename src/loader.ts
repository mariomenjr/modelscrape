"use strict";

const trae = require("trae");
const cheerio = require("cheerio");

const { makeUrl } = require("./config");
const { Entity, Prop, Page } = require("./types");

const { validateParam, validateQuery } = require("./utils/validators");

const { AttributeError } = require("./errors");

/**
 * Set the base url for page templates
 *
 * @param {*} domain
 * @return {Function}
 */
function fetchHtmlAndAddCheerio(domain) {
    const joinEndpoint = makeUrl(domain);
    /**
     * Fetch HTML for PageTemplate
     *
     * @param {Query} query It delivers the endpoint to be executed for the particular URL
     * @return Page
     */
    return async function (query) {
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
    // Continue only if there's an attrs prop
    if (!collection.hasOwnProperty("attrs")) return {};
    if (!Array.isArray(collection.attrs)) {
        if (collection.attrs === undefined) return {};

        // Dispatch error if the attrs prop is not an Array
        throw AttributeError.mustBeArray();
    }

    // Collecting attributes. If not found, then null.
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
     * It will extract data from HTML according to queries defined in model
     *
     * @param {EntityModel}
     */
    return function (entityModel) {
        const { props, query: entityQuery } = entityModel;
        const entityNodes = $(entityQuery);

        return (
            entityNodes
                // .map method is Cheerios not the regular Array.map
                .map((_, entityNode) => {
                    const entityInstance = new Entity({
                        name: entityModel.name,
                    });

                    entityInstance.attrs = selectNodeAttributes(
                        entityModel,
                        entityNode
                    );

                    // In order to create an object for attributtes.
                    // The provided name of the attribute will be used as key in obj.
                    entityInstance.props = props.reduce((prop, propModel) => {
                        const propNodes = $(propModel.query, entityNode);
                        const propsArray = propNodes
                            // .map method is Cheerios not the regular Array.map
                            .map((_, propNode) => {
                                const propInstance = new Prop({
                                    name: propModel.name,
                                });

                                // If no text-type node is found, then null.
                                propInstance.value =
                                    propNode.nodeType === 1
                                        ? propNode.children.length > 0
                                            ? propNode.children
                                                  .map((child) =>
                                                      child.nodeType === 3
                                                          ? child.data
                                                          : null
                                                  )
                                                  .filter(
                                                      (item) =>
                                                          item !== null &&
                                                          item !== undefined
                                                  )
                                            : null
                                        : propNode.nodeType === 3
                                        ? propNode.data
                                        : null;

                                propInstance.attrs = selectNodeAttributes(
                                    propModel,
                                    propNode
                                );

                                return propInstance;
                            })
                            .get();

                        // I know... it can be simpler. You are welcome to submit a PR :)
                        // If not a valid item, then null
                        prop[propModel.name] =
                            propsArray.length > 0
                                ? propsArray.length > 1
                                    ? propsArray
                                    : propsArray[0]
                                : null;
                        return prop;
                    }, {});

                    return entityInstance;
                })
                .get()
        );
    };
}

/**
 * Populates the page template collection with actual entities
 *
 * @param {PageTemplate} page Page template object
 * @return Array
 */
function populatePageCollections(pageTemplate) {
    const { $, collections } = pageTemplate;
    return collections.map(produceEntityCollection($));
}

/**
 * Loader for scrapping
 *
 * @param {object} {url: string, pages: Array} - Url and Pages template collection
 * @return Promise
 */
module.exports = async (param) => {
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
};
