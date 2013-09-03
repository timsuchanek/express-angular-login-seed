'use strict';

angular.module('generatorLoginApp', [])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/privateArea', {
        templateUrl: 'views/privateArea.html',
        controller: 'PrivateareaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
