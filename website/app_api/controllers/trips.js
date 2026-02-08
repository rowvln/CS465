const mongoose = require('mongoose');
require('../models/travlr');

const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    const trip = await Trip.findOne({ code: tripCode }).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
