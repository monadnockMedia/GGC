'use strict';

angular.module('ggcApp')
  .directive('cardList', function () {
    return {
      templateUrl: 'app/cardList/cardList.html',

      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });