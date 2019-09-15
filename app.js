"use strict";

// Use a nice table to print the report or error
require("./src")()
  .then(msg => console.log(msg))
  .catch(err => console.error(err));
