'use strict';

angular.module('generatorLoginApp')
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
  });