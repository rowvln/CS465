const mongoose = require('mongoose');
require('../models/travlr');

const Trip = mongoose.model('trips');

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/trips/:tripCode
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

// POST /api/trips
const tripsAdd = async (req, res) => {
  try {
    // minimal validation
    if (!req.body.code || !req.body.name) {
      return res.status(400).json({ message: 'code and name are required' });
    }

    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// PUT /api/trips/:tripCode
const tripsUpdateByCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    const trip = await Trip.findOne({ code: tripCode });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    // update fields (only if provided)
    trip.name = req.body.name ?? trip.name;
    trip.length = req.body.length ?? trip.length;
    trip.start = req.body.start ?? trip.start;
    trip.resort = req.body.resort ?? trip.resort;
    trip.perPerson = req.body.perPerson ?? trip.perPerson;
    trip.image = req.body.image ?? trip.image;
    trip.description = req.body.description ?? trip.description;

    const updatedTrip = await trip.save();
    return res.status(200).json(updatedTrip);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// DELETE /api/trips/:tripCode
const tripsDeleteByCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    const result = await Trip.deleteOne({ code: tripCode });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAdd,
  tripsUpdateByCode,
  tripsDeleteByCode
};
