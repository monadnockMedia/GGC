'use strict';

angular.module('ggcApp')
  .directive('ggcAttractVid', function (dealer, ggcAttractOverlord) {
    return {
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs, nullCtrl, transclude) {

        ggcAttractOverlord.makePop(element[0]);


        transclude(scope, function(clone){

          element.html( clone );
        })
      }
    };
  });
