var express = require('express'),
    app = express(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    configPassport = require('./config/passport'),
    configExpress = require('./config/express'),
    configRoutes = require('./config/routes'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

// Connect DB
mongoose.connect(config.db);

// Configure Express
configExpress(app, config);

// Configure Routes
configRoutes(app, config, configPassport);

// for grunt-express usage,
// app.listen is forbidden in this case!
module.exports = app;