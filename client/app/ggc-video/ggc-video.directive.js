'use strict';

angular.module('ggcApp')
  .directive('ggcVideo', function ( dealer ) {
    return {
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs, nullCtrl, transclude) {
        transclude(scope, function(clone){
          element.css("visibility","hidden");
          element.on("ended",function(a,b,c){ dealer.videoEventEnd();});
          element.on("playing",function(a){$(this).css("visibility", "visible");});
          element.html( clone );
        })
      }
    };
  });

