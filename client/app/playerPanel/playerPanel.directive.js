'use strict';

angular.module('ggcApp')
  .directive('playerPanel', function () {
    return {
      templateUrl: 'app/playerPanel/playerPanel.html',
      restrict: 'EA',
      scope: false,
      link: function (scope, element, attrs) {
      }
    };
  });
