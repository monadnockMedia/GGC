'use strict';

angular.module('ggcApp')
  .directive('ggcVideo', function (dealer) {
    return {
      restrict: 'A',
      transclude: "element",
      link: function (scope, element, attrs, nullController, transclude) {

        transclude(scope, function(clone){
          $(clone).on("ended",function(a){dealer.videoEventEnd();});
          element.after( clone );
        })
      }
    };
  });


