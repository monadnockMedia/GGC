'use strict';

angular.module('ggcApp')
  .directive('ggcPrologueVid', function (dealer, ggcPrologueOverlord) {
    return {
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs, nullCtrl, transclude) {

        ggcPrologueOverlord.makePop(element[0]);

       // element.on('destroy', ggcPrologueOverlord.destroy());

        transclude(scope, function(clone){
          element.css("visibility","hidden");
          element.on("ended",function(a,b,c){ dealer.videoEventEnd();});
          element.on("playing",function(a){$(this).css("visibility", "visible");});
          element.html( clone );
        });

      }
    };
  });

//
//'use strict';
//
//angular.module('ggcApp')
//  .directive('ggcVideo', function (dealer) {
//    return {
//      restrict: 'A',
//      transclude: "element",
//      link: function (scope, element, attrs, nullController, transclude) {
//
//        transclude(scope, function(clone){
//          $(clone).on("ended",function(a){dealer.videoEventEnd();});
//          element.after( clone );
//        })
//      }
//    };
//  });

