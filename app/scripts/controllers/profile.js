'use strict';

angular.module('generatorLoginApp')
  .controller('ProfileCtrl', function ($scope, AuthenticationService) {
    $scope.navType = 'pills';

    $scope.user = {username:"name", password:"password", email:'email@ja.de'};

  });
