var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models/users');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

  // NOTE: Need to protect all API calls (other than login/logout) with this check
exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.send(401);
    }
  },


// Check for admin middleware, this is unrelated to passport.js
// You can delete this if you use different method to check for admins or don't need admins
exports.ensureAdmin = function (req, res, next) {
  return function(req, res, next) {
    console.log(req.user);
      if(req.user && req.user.admin === true)
        next();
      else
        res.send(403);
  }
}



exports.csrf = function(req) {
  var token = (req.body && req.body._csrf)
  || (req.query && req.query._csrf)
  || (req.headers['x-csrf-token'])
  || (req.headers['x-xsrf-token']);
  return token;
}