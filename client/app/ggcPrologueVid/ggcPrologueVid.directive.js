'use strict';

angular.module('ggcApp')
  .directive('ggcPrologueVid', function (dealer, ggcPrologueOverlord) {
    return {
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs, nullCtrl, transclude) {

        ggcPrologueOverlord.makePop(element[0]);


        transclude(scope, function(clone){
          $(clone).css("visibility","hidden");
          $(clone).on("ended",function(a,b,c){ dealer.videoEventEnd();});
          $(clone).on("playing",function(a){$(this).css("visibility", "visible");});
          element.html( clone );
        })
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

