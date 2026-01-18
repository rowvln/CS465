/**
 * travel.js (routes)
 *
 * Defines the routing for the Travel page.
 * This file connects incoming requests to the appropriate controller logic
 * as part of the MVC structure.
 */

const express = require("express");
const router = express.Router();
const ctrlTravel = require("../controllers/travel");

/**
 * GET /travel
 * Renders the Travel page using data prepared by the controller.
 */
router.get("/", ctrlTravel.travelList);

module.exports = router;