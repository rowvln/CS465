const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

// POST /api/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation (keeps you from getting weird crashes)
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Prevent duplicate users
    const existing = await User.findOne({ email: email.toLowerCase() }).exec();
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User({
      name,
      email: email.toLowerCase()
    });

    user.setPassword(password);

    await user.save();

    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// POST /api/login
const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (!user) {
      // info.message comes from passport strategy (“Incorrect email/password”)
      return res.status(401).json(info);
    }

    const token = user.generateJwt();
    return res.status(200).json({ token });
  })(req, res);
};

module.exports = {
  register,
  login
};