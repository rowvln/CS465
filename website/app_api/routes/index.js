const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// JWT middleware to protect admin endpoints
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header required' });
  }

  // Expect: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Authorization header must be: Bearer <token>' });
  }

  const token = parts[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = payload; // optional, but nice to have
    next();
  });
};

// /api/register
router.post('/register', authController.register);

// /api/login
router.post('/login', authController.login);

// /api/trips
router.route('/trips')
  .get(tripsController.tripsList)                 // public
  .post(authenticateJWT, tripsController.tripsAdd); // protected

// /api/trips/:tripCode
router.route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)                             // public
  .put(authenticateJWT, tripsController.tripsUpdateByCode)          // protected
  .delete(authenticateJWT, tripsController.tripsDeleteByCode);      // protected

module.exports = router;