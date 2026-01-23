/**
 * travel.js (controller)
 *
 * Controller for the Travel page.
 * Handles preparing data and rendering the view using Handlebars.
 */

const travel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways'});
};

module.exports = {
  travel
};