"use strict";

const EntityModel = require("./EntityModel");
const { validatePageCollections } = require("../utils/validators");

function Page({ name, endpoint, collections }) {
    this.name = name;
    this.endpoint = endpoint;

    this.collections = validatePageCollections(collections)(
        entityModel => new EntityModel(entityModel)
    );
}

Page.prototype.setCheerio = function($) {
    Object.defineProperty(this, "$", {
        get: function() {
            return $;
        }
    });
};

module.exports = Page;
