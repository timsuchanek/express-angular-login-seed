var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    path = require('path'),
    passport = require('passport');

module.exports = function (app, config) {
  app.set('showStackError', true);
  app.set('views', path.resolve(config.root, '/views'));
  app.set('view engine', 'jade');

  app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.session({
      secret: config.SESSION_SECRET,
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/../../public'));
    app.use(app.router);
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));

  });

  app.configure('development', function() {
    app.locals.pretty = true;
  });

  app.configure('production', function() {
    app.use(express.errorHandler());
  });
}