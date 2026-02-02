/**
 * travel.js (controller)
 *
 * Controller for the Travel page.
 * Handles preparing data and rendering the view using Handlebars.
 */
const Trip = require('../models/travlr');

const travel = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    res.render('travel', {
      title: 'Travlr Getaways',
      trips
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  travel
};