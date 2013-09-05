module.exports = function (app, config, pass) {
  var fs = require('fs'),
      path = require('path'),
      routes_path = path.resolve(config.root, 'routes');

  // auto import all routes by calling this['prop'] = require....
  // slice(0,-3), because ".js" has to be sliced
  fs.readdirSync(routes_path).forEach(function(file) {
    return this[file.slice(0, -3)] = require("" + routes_path + "/" + file);
  });

  // User pages
  app.post('/login', user.postlogin);
  app.get('/logout', user.logout);

  app.get('/user', pass.ensureAuthenticated, function(req, res, next) {
    return res.json(req.session.user);
  });
}