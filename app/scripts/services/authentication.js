'use strict';

angular.module('generatorLoginApp')
   .service('AuthenticationService', function($http, $timeout, $q, $session) {
    this.login = function(credentials) {
      var login = $http.post('/login', credentials);
      login.success(function(user) {
        $session.set('user', user);
      }).error(function(error) {
        error = error.error ? error.error : error;
      });
      return login;
    };

    this.logout = function() {
      var logout = $http.get('/logout');
      logout.success(function() {
        $session.clear();
      });
      return logout;
    };

    this.user = function() {
      var user = $session.get('user');
      if (user) {
        var deferred = $q.defer();
        $timeout(function() {
          deferred.resolve(user);
        }, 0);
        return deferred.promise;
      } else {
        return $http.get('/user');
      }
    };
  });