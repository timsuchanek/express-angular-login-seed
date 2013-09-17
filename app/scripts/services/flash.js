'use strict';

angular.module('generatorLoginApp')
     .service('$flash', function($rootScope) {
    this.show = function(message) {
      $rootScope.flash = message;
    };

    this.clear = function() {
      $rootScope.flash = '';
    };
  });