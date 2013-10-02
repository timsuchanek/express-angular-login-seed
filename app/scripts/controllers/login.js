'use strict';

angular.module('generatorLoginApp')
  .controller('LoginCtrl', function ($scope, $location, AuthenticationService) {
    // This variable is used to toggle the login and registration form
    $scope.toggle = 1;
    $scope.loginError = false;

    $scope.login = function() {
      AuthenticationService.login(this.credentials).success(function() {
        $location.path('/'); // TODO: route back to where user was coming from (before login page)
        $scope.loginError = false;
      }).error(function () {
        $scope.loginError = true;
      });
    };

    $scope.registration = function () {
      AuthenticationService.registration(this.newUser);
    };
  });
