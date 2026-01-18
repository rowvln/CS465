/**
 * app.js
 *
 * Main entry point for the Travlr Getaways application.
 * This file sets up Express, configures Handlebars for MVC rendering,
 * and registers the routes used throughout the application.
 */

const express = require("express");
const path = require("path");
const hbs = require("hbs");

// Import MVC route(s)
const travelRouter = require("./app_server/routes/travel");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Configure Handlebars as the view engine.
 * Views are rendered from the app_server/views directory,
 * and shared layout components are registered as partials.
 */
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));

/**
 * Custom helper used in templates to compare values.
 * This is used to highlight the active category tab on the Travel page.
 */
hbs.registerHelper("isEqual", (a, b) => a === b);

/**
 * Serve static files such as CSS, images, and static HTML pages
 * from the public directory.
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * Home route
 * Currently serves a static HTML page from Module One.
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * Travel route
 * Routes requests to the travel MVC controller.
 */
app.use("/travel", travelRouter);

/**
 * Simple test endpoint to confirm the server is running.
 */
app.get("/api/ping", (req, res) => {
  res.json({
    message: "Express is working",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Fallback handler for undefined routes.
 */
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

/**
 * Start the Express server.
 */
app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});
