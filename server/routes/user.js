var passport = require('passport')
  , mongoose = require('mongoose')
  , _ = require('lodash')
  , User = require('../models/users');

exports.account = function(req, res) {
  res.render('account', {
    user: req.user
  });
};

exports.getlogin = function(req, res) {
  res.render('login', {
    user: req.user,
    message: req.session.messages
  });
};

exports.admin = function(req, res) {
  res.send('access granted admin!');
};

exports.postlogin = function(req, res, next) {
    return passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(400, {message: 'Bad username or password'});
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }

        res.json(200, user);
      });
    })(req, res, next);
  };

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


/**
 * payload: {
 *   username: 'ads',
 *   email: 'ads',
 *   password: 'asd'
 * }
 */

exports.register = function(req, res, next) {
    var defaultSettings = {
      admin: false
    };

    var user = _.extend(defaultSettings, req.body);
    user = new User(user);

    user.save(function (err, newUser) {
      if (err) res.error(err);
      res.send({
        message: 'User created successfully! Now we just need to implement mail ;)'
      });
    });
    // send mail ...
}