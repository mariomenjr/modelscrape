"use strict";

class ParamError extends Error {
    constructor(message) {
        super(message);

        this.name = "ParamError";
    }

    static invalidURL() {
        return new ParamError("An invalid URL has been provided");
    }

    static invalidQueryObjects() {
        return new ParamError(
            "An invalid queryObjects collection has been provided"
        );
    }
}

module.exports = ParamError;
