module.exports = function(app, config, pass) {
  var fs = require('fs'),
    path = require('path'),
    routes_path = path.resolve(config.root, 'server/routes'),
    mongoose = require('mongoose'),
    User =  mongoose.model('User');

  // auto import all routes by calling this['prop'] = require....
  // slice(0,-3), because ".js" has to be sliced
  fs.readdirSync(routes_path).forEach(function(file) {
    return this[file.slice(0, -3)] = require("" + routes_path + "/" + file);
  });

  // User pages
  app.post('/login', user.postlogin);
  app.get('/logout', user.logout);

  app.get('/user', pass.ensureAuthenticated, function(req, res, next) {
    var dummy = {
      username: 'bob',
      email: 'bob@mail.com'
    }
    return res.json(dummy);
  });


  /**
   * payload: {
   *   username: 'asd',
   *   email: 'blub'
   * }
   */
  app.put('/user', pass.ensureAuthenticated, function(req, res, next) {
    //change user...
  });

  /**
   * payload: {
   *   username: 'ads',
   *   email: 'ads',
   *   password: 'asd'
   * }
   */
  app.post('/user', user.register);




  app.all('/*', function(req, res, next) {
    res.sendfile('index.html', {
      root: __dirname + '../../../app'
    });
  });

}