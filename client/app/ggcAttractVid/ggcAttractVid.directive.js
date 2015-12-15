'use strict';

angular.module('ggcApp')
  .directive('ggcAttractVid', function (dealer, ggcAttractOverlord) {
    return {
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs, nullCtrl, transclude) {
        //ggcAttractOverlord.makePop(element[0]);

        //element.on("$destroy", ggcAttractOverlord.destroy());

        transclude(scope, function(clone){
          element.css("visibility","hidden");
          element.on("ended",function(a,b,c){ dealer.videoEventEnd();});
          element.on("playing",function(a){$(this).css("visibility", "visible");});
          element.html( clone );
        })
      }
    };
  });
