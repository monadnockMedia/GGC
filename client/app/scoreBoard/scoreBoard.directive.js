'use strict';

angular.module('ggcApp')
  .directive('scoreBoard', function () {
    return {
      templateUrl: 'app/scoreBoard/scoreBoard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });