"use strict";

class AttributeError extends Error {
    constructor(message) {
        super(message);

        this.name = "AttributeError";
    }

    static mustBeArray() {
        return new AttributeError("Property {attrs} must be an Array");
    }
}

module.exports = AttributeError;
