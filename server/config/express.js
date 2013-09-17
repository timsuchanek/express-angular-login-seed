var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    path = require('path'),
    passport = require('passport');

module.exports = function (app, config, pass) {
  app.set('showStackError', true);
  app.set('views', path.resolve(config.root, '/views'));
  app.set('view engine', 'jade');

  app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // marker for `grunt-express` to inject static folder/contents
    app.use(function staticsPlaceholder(req, res, next) {
      return next();
    });

    // storing sessions in mongo
    app.use(express.session({
      secret: config.SESSION_SECRET,
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    }));

  // Add csrf support
  // app.use(express.csrf({value: pass.csrf}));
  // app.use(function(req, res, next) {
  //     res.cookie('XSRF-TOKEN', req.session._csrf);
  //     next();
  //  });

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/../../app'));
    app.use(app.router);
  });

  app.configure('development', function() {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.use(express.logger('dev'));
    app.locals.pretty = true;
  });

  app.configure('production', function() {
    app.use(express.errorHandler());
  });
}