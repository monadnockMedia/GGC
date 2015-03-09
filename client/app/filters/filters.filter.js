'use strict';
var app = angular.module('ggcApp');

app.filter('percent', function () {
    return function (input) {
      return ~~(input*100)+"%";
    };
  });

app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});