'use strict';

angular.module('generatorLoginApp', ['ui.router', 'ui.bootstrap'])
  .service('$flash', function($rootScope) {
    this.show = function(message) {
      $rootScope.flash = message;
    };

    this.clear = function() {
      $rootScope.flash = '';
    };
  })
  .factory('$session', function() {
    return {
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      set: function(key, value) {
        return sessionStorage.setItem(key, value);
      },
      unset: function(key) {
        return sessionStorage.removeItem(key);
      },
      clear: function() {
        return sessionStorage.clear();
      }
    };
  })
  .service('AuthenticationService', function($http, $timeout, $q, $session, $flash) {
    this.login = function(credentials) {
      var login = $http.post('/login', credentials);
      login.success(function(user) {
        $session.set('user', user);
        $flash.clear();
      }).error(function(error) {
        error = error.error ? error.error : error;
        $flash.show(error.message || error);
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
  })
  .config(function($httpProvider) {
    var logsOutUserOn401 = function($location, $q, $session) {
      var success = function(response) {
        return response;
      };

      var error = function(response) {
        if (response.status === 401) {
          $session.unset('user');
          $location.path('/login');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      };

      return function(promise) {
        return promise.then(success, error);
      };
    };

    $httpProvider.responseInterceptors.push(logsOutUserOn401);
  })
  .run(function($rootScope, $location, AuthenticationService) {
    $rootScope.logout = function () {
      var logout = AuthenticationService.logout();
      logout.then(function() {
        $location.path('/login');
      });
      return logout;
    };
  })
  .run(function($rootScope, $location, AuthenticationService) {
    var publicRoutes = ['/login'];

    $rootScope.$on('$routeChangeStart', function() {
      if (publicRoutes.indexOf($location.path()) === -1) {
        AuthenticationService.user(); // http responseInterceptor will redirect to /login if this call fails
      }
    });
  })
  .config(function ($stateProvider,  $urlRouterProvider) {      
    $stateProvider
    .state('navbar', {
        abstract: true,  
        templateUrl: 'views/navbar.html',
        controller: 'MainCtrl'
      })
      .state('navbar.home', {
        url: '/', 
        templateUrl: 'views/main.html',
        controller: 'NavBarCtrl'
      })      
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('navbar.profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      });
  }).run(
      [        '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);;