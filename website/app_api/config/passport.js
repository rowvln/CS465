const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// This works because db.js requires './user' which registers the model
const User = mongoose.model('users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email' // tell passport we login with email, not "username"
    },
    async (email, password, done) => {
      try {
        // Normalize email to avoid case issues
        const user = await User.findOne({ email: email.toLowerCase() }).exec();

        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);