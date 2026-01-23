/**
 * travel.js (controller)
 *
 * Controller for the Travel page.
 * Handles preparing data and rendering the view using Handlebars.
 */
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways', trips});
};

module.exports = {
  travel
};