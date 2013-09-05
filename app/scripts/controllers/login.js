'use strict';

angular.module('generatorLoginApp')
  .controller('LoginCtrl', function ($scope, $location, AuthenticationService) {
    $scope.sampleUsers = [
      {
        username: 'admin',
        password: 'secret'
      },
      {
        username: 'bob',
        password: 'secret'
      }
    ];

    $scope.login = function() {
      AuthenticationService.login(this.credentials).success(function() {
        $location.path('/'); // TODO: route back to where user was coming from (before login page)
      });
    };
  });
