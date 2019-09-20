"use strict";

const trae = require("trae");
const cheerio = require("cheerio");

const { URLS } = require("./config");
const { Entity, Prop, Element } = require("./types");

async function fetchHtmlAndAddCheerio(page) {
    const url = URLS[page.name];
    const resp = await trae.get(url);

    return {
        ...page,
        $: cheerio.load(resp.data)
    };
}

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

function produceEntityCollection($) {
    return function(entity) {
        const { props, query: entityQuery } = entity;
        const entityNodes = $(entityQuery);

        return entityNodes
            .map((i, entityNode) => {
                const entityInstance = new Entity({
                    name: entity.name,
                    query: entity.query
                });

                entityInstance.attrs = selectNodeAttributes(entity, entityNode);
                entityInstance.items = props.map(prop => {
                    const propNodes = $(prop.query, entityNode);
                    const propsArray = propNodes
                        .map((j, propNode) => {
                            const propInstance = new Prop({
                                name: prop.name,
                                query: prop.query
                            });

                            propInstance.value = propNode.nodeValue;
                            propInstance.attrs = selectNodeAttributes(
                                prop,
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

function populatePageCollections(page) {
    const { $, collections } = page;

    const what = collections.map(produceEntityCollection($));
    return what;
}

module.exports = async ({ url, pages }) => {
    try {
        pages = await Promise.all(pages.map(fetchHtmlAndAddCheerio));
        const res = pages.map(populatePageCollections);

        return res;
    } catch (error) {
        return error;
    }
    // Sent back a report of what happened
};
