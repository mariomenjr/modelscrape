"use strict";

function inheritErrorType(target, { message, fileName, lineNumber }) {
    const instance = new Error(message, fileName, lineNumber);
    instance.name = "CustomError";

    Object.setPrototypeOf(instance, Object.getPrototypeOf(target));
    if (Error.captureStackTrace) Error.captureStackTrace(instance, target);

    target.prototype = Object.create(Error.prototype, {
        constructor: {
            value: Error,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(target, Error);
    } else {
        target.__proto__ = Error;
    }

    return instance;
}

function appendReadonlyProps(obj, defaults = {}, props = {}) {
    Object.keys(props).forEach(prop =>
        Object.defineProperty(obj, prop, {
            value: defaults.hasOwnProperty(prop) ? defaults[prop] : props[prop],
            enumerable: true
        })
    );
}

module.exports = { appendReadonlyProps, inheritErrorType };
