"use strict";

const { appendReadonlyProps } = require("../utils");

module.exports = function Element(params = {}) {
    appendReadonlyProps(this, params, {
        name: null
    });

    this.attrs = [];
    this.value = null;
};
