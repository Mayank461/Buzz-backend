const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../models/userModel');
const { API_URL, CLIENT_URL } = require('../config');

const clientID = process.env.G_CLIENT_ID;
const clientSecret = process.env.G_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: `${API_URL}/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // find if a user exist with this email or not
      user.findOne({ email: profile.emails[0].value }, (err, data) => {
        if (data) {
          // user exists
          return done(null, data);
        } else {
          console.log('user created');
          // create a user
          user({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            picture_url: profile.photos[0].value,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: null,
            provider: 'google',
            isVerified: true,
          }).save((err, data) => {
            return done(null, data);
          });
        }
      });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user.findById(id, function (err, user) {
    done(err, user);
  });
});

router.use(passport.initialize());
router.use(passport.session());

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `/login/success`,
    successRedirect: `${CLIENT_URL}`,
  })
);

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({ user: req.user, success: true });
  } else res.json({ success: false });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
