"use strict";

const Element = require("./Element");

module.exports = function Entity(params = {}) {
    Element.call(this, params);
    this.props = [];
};
