'use strict';

angular.module('ggcApp')
  .directive('ggcSvgFilters', function () {
    return {
      templateUrl: 'app/ggcSvgFilters/ggcSvgFilters.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });