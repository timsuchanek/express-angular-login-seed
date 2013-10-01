'use strict';

angular.module('generatorLoginApp', ['ui.router', 'ui.bootstrap'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('navbar', {
        abstract: true,
        templateUrl: 'views/secret/navbar.html',
        controller: 'MainCtrl'
      })
      .state('navbar.home', {
        url: '/',
        templateUrl: 'views/secret/main.html',
        controller: 'NavBarCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('navbar.profile', {
        url: '/profile',
        templateUrl: 'views/secret/profile.html',
        controller: 'ProfileCtrl'
      });

    $locationProvider.html5Mode(true);
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
    $rootScope.logout = function() {
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
  .run(
      ['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]);
