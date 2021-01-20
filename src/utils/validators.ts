"use strict";

const { ParamError, ModelError } = require("../errors");

function _hasProperty(object) {
    return function(propName) {
        if (!object.hasOwnProperty(propName))
            throw Error(`Property {${propName} not found.}`);
    };
}

const PARAM_URL_REGEX = /[(http(s)):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const PARAM_REQ_PROPS = ["url", "queryObjects"];

function validateParam(param) {
    PARAM_REQ_PROPS.forEach(_hasProperty(param));

    if (!PARAM_URL_REGEX.test(param.url)) throw ParamError.invalidURL();
    if (!Array.isArray(param.queryObjects))
        throw ParamError.invalidQueryObjects();

    return param;
}

const QUERY_REQ_PROPS = ["name", "endpoint", "collections"];
function validateQuery(query) {
    QUERY_REQ_PROPS.forEach(_hasProperty(query));

    if (!Array.isArray(query.collections))
        throw ModelError.invalidProperty("collections");

    return query;
}

function validatePageCollections(collections) {
    if (!Array.isArray(collections))
        throw ModelError.invalidPropertyType("collections", "Array");
    return mapper => collections.map(mapper);
}

function validateEntityProps(props) {
    if (!Array.isArray(props))
        throw ModelError.invalidPropertyType("props", "Array");
    return mapper => props.map(mapper);
}

module.exports = {
    validateParam,
    validateQuery,
    validatePageCollections,
    validateEntityProps
};
