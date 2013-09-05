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
  app.get('/account', pass.ensureAuthenticated, user.account);
  app.get('/login', user.getlogin);
  app.post('/login', user.postlogin);
  app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user.admin);
  app.get('/logout', user.logout);
}