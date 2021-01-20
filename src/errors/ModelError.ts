"use strict";

class ModelError extends Error {
    constructor(message) {
        super(message);

        this.name = "ParamError";
    }

    static invalidProperty(propName) {
        return new ModelError(`An invalid {${propName}} property provided.`);
    }

    static invalidPropertyType(propName, typeToBeName) {
        return new ModelError(`{${propName}} must be type {${typeToBeName}}`);
    }
}

module.exports = ModelError;
