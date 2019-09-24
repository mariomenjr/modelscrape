"use strict";

const PropModel = require("./PropModel");
const { validateEntityProps } = require("../utils/validators");

module.exports = function EntityModel({ name, query, attrs, props }) {
    this.name = name;
    this.query = query;
    this.attrs = attrs;

    this.props = validateEntityProps(props)(
        propModel => new PropModel(propModel)
    );
};
