'use strict';

angular.module('ggcApp')
  .directive('ggcIcon', function (ggcUtil, $compile) {
    return {
      //templateUrl: 'app/ggcIcon/ggcIcon.html',
      restrict: 'EA',
      scope: {
        "iconId": '@',
        "frame": "@",
        iconClass: "@"
      },
      link: function (scope, element, attrs) {
        var width = element.parent().width();
        var padding = 10;
        var framePath = "M70.149,31.213C72.817,30.546,77.25,30,80,30h140 c2.75,0,7.183,0.546,9.851,1.213l50.299,12.574C282.817,44.454,285,47.25,285,50v200c0,2.75-2.183,5.546-4.851,6.213 l-50.299,12.574C227.183,269.454,222.75,270,220,270H95c-2.75,0-7.207-0.441-9.903-0.98L19.903,255.98 C17.207,255.441,15,252.75,15,250V50c0-2.75,2.183-5.546,4.851-6.213L70.149,31.213z";
        var svg = d3.selectAll(element).append("svg");
        svg.attr("viewBox", "0 0 300 300");
        var iconGroup = svg.append("g").attr("class", "iconGroup "+scope.iconClass);

        attrs.$observe('iconId', function (value) {
          console.log("$OBSERVE",  value.length);
          if (value.length > 0) {
            iconGroup.selectAll("*").remove();
            scope.trust = ggcUtil.trustSVG;
            ggcUtil.getIcons(value).then(function (res) {
              var icon = res.data;

              var iconElement = angular.element(icon.icon);
              var iconNode = d3.selectAll(iconElement);

              var children = iconNode.selectAll("*");

              children.each(function () {
                var child = this;
                d3.select(child).attr({stroke:null, fill:null});
                iconGroup.append(function () {
                  return child;
                });

              })

              //var svg = d3.selectAll(iconElement);
              if (scope.frame) {
                svg.selectAll(".frame").remove();
                iconGroup.attr("transform", "scale(0.7) translate(60,60)");
                svg.append("path").attr("d", framePath).attr({
                  "class": "frame", "shape-rendering":"optimizeQuality", "stroke-width":"4px",
                  "stroke-miterlimit": 15, fill: "none"
                });
              }


              /* scope.compIcon = iconElement[0].outerHTML;
               scope.icon = icon;*/
            });
            //some action
          }

        });
      }

    };
  })


