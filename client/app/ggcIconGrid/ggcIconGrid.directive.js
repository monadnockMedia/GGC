'use strict';

angular.module('ggcApp')
  .directive('ggcIconGrid', function (ggcMapper) {
    return {
      templateUrl: 'app/ggcIconGrid/ggcIconGrid.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        scope.grid = ggcMapper.grid;
        scope.$watch("grid", function(v){console.log(v)});


      }
    };
  });




angular.module('ggcApp').directive(
  "iconWrap",
  function(ggcMapper) {

    // At this point, the "element" is the COMMENT that
    // has been injected into the DOM as an anchor for
    // the subsequent transclusion.
    function link( scope, element, attributes, nullController, transclude ) {
      var hex = scope.hex;

      transclude(
        scope,
        function( clone ) {
          var radius = ~~(ggcMapper.grid.hexRadius);
          var height = ~~(ggcMapper.grid.hexRadius*2);
          var width = 2*(radius*0.866);
          var cx = ~~(hex.x);
          var cy = ~~(hex.y);
          clone.addClass("iconWrap absolute");
          clone.css({
            left:cx - width/2, top: cy - height/2, width: width, height:height
          });
          element.after( clone );

        }
      );

    }


    // Return the directive configuration.
    return({
      link: link,
      restrict: "A",
      transclude: "element"
    });

  }
);
