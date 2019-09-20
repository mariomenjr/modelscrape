"use strict";

function appendReadonlyProps(obj, defaults = {}, props = {}) {
    Object.keys(props).forEach(prop =>
        Object.defineProperty(obj, prop, {
            value: defaults.hasOwnProperty(prop) ? defaults[prop] : props[prop],
            enumerable: true
        })
    );
}

module.exports = { appendReadonlyProps };
