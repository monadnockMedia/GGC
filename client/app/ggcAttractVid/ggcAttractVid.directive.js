'use strict';

angular.module('ggcApp')
  .directive('ggcAttractVid', function (dealer, ggcAttractOverlord) {
    return {
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs, nullCtrl, transclude) {

        ggcAttractOverlord.makePop(element[0]);


        transclude(scope, function(clone){
          $(clone).css("visibility","hidden");
          $(clone).on("ended",function(a,b,c){ dealer.videoEventEnd();});
          $(clone).on("playing",function(a){$(this).css("visibility", "visible");});
          element.html( clone );
        })
      }
    };
  });
