/**
 * index.js (routes)
 *
 * Defines the routing for the index page.
 * This file connects incoming requests to the appropriate controller logic
 * as part of the MVC structure.
 */

const express = require("express");
const router = express.Router();
const ctrlMain = require("../controllers/main");

/**
 * GET home page
 * Renders the home page using data prepared by the controller.
 */
router.get("/", ctrlMain.index);

module.exports = router;