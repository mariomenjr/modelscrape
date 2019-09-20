"use strict";

const Types = require("./types");
const config = require("./config");

const loader = require("./loader");

module.exports = { ...Types, config, loader };
