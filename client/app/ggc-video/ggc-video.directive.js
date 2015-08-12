'use strict';

angular.module('ggcApp')
  .directive('ggcVideo', function (dealer) {
    return {
      restrict: 'A',
      transclude: "element",
      link: function (scope, element, attrs, nullController, transclude) {

        transclude(scope, function(clone){
          $(clone).css("visibility","hidden");
          $(clone).on("ended",function(a){dealer.videoEventEnd();});
          $(clone).on("playing",function(a){$(this).css("visibility", "visible");});
          element.after( clone );
        })
      }
    };
  });


