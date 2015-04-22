'use strict';

angular.module('ggcApp')
  .directive('ggcPrologueVid', function () {
    return {
      templateUrl: 'app/ggcPrologueVid/ggcPrologueVid.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var pop = Popcorn(element);
        debugger;


      }
    };
  });
