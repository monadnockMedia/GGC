'use strict';

angular.module('ggcApp')
  .directive('ggcIcon', function (ggcUtil, $location) {
    return {
      //templateUrl: 'app/ggcIcon/ggcIcon.html',
      restrict: 'EA',
      scope: {
        "iconId": '@',
        "frame": "@",
        iconClass: "@",
        gridIndex: "@",
        gridClass: "@",
        fill:"@",
        glow: "@"
      },

      link: function (scope, element, attrs) {
        $(element).addClass(scope.gridClass);
        var abs = $location.absUrl();
        //get width of container

        var width = element.parent().width();

        //  var framePath = "M70.149,31.213C72.817,30.546,77.25,30,80,30h140 c2.75,0,7.183,0.546,9.851,1.213l50.299,12.574C282.817,44.454,285,47.25,285,50v200c0,2.75-2.183,5.546-4.851,6.213 l-50.299,12.574C227.183,269.454,222.75,270,220,270H95c-2.75,0-7.207-0.441-9.903-0.98L19.903,255.98 C17.207,255.441,15,252.75,15,250V50c0-2.75,2.183-5.546,4.851-6.213L70.149,31.213z";
        var framePath = "M7.768,156.833c-0.835-3.758-0.835-9.908,0-13.667l21.963-98.833c0.835-3.758,4.668-6.833,8.519-6.833h223.5c3.85,0,7.684,3.075,8.519,6.833l21.963,98.833c0.835,3.758,0.835,9.909,0,13.667l-21.963,98.834c-0.835,3.758-4.669,6.833-8.519,6.833H38.25c-3.85,0-7.683-3.075-8.519-6.833L7.768,156.833z"
        var svg = d3.selectAll(element).append("svg").attr("grid-index", scope.gridIndex);
        svg.attr("viewBox", "0 0 300 300");
        var iconGroup = svg.append("g");

        attrs.$observe('iconId', function (value) {
          //console.log("$OBSERVE", value.length);
          if (value.length > 0) {

            iconGroup.selectAll("*").remove();

            scope.trust = ggcUtil.trustSVG;

            ggcUtil.getIcons(value).then(function (res) {


              var icon = res.data;
              var glow = scope.glow === "true";
              var team = icon.team;
              var fill = scope.fill === "true";

              iconGroup.attr("class", function(){
                var cl="iconGroup ";
                cl+=(fill) ? team : "";
                return cl;
              })

              var iconElement = angular.element(icon.icon);
              var iconNode = d3.selectAll(iconElement);
              var children = iconNode.selectAll("*");

              var l1 = iconGroup.append("g").attr("class", "l1 ");
              var l2 = iconGroup.append("g").attr("class", "l2");

              children.each(function () {
                var child = this;
                var c2 = child.cloneNode(true);
                d3.select(child).attr({stroke: null, fill: null});
                d3.select(c2).attr({stroke: null, fill: null});

                l2.append(function () {
                  return child;
                });

                if(scope.glow){
                  l1.attr("class","l1 "+team+" glow").style("filter","url("+abs+"#glow)");
                  l1.append(function () {
                    return c2;
                  });
                }


              });


              //var svg = d3.selectAll(iconElement);
              if (scope.frame) {
                svg.selectAll(".frame").remove();
                iconGroup.attr("transform", "scale(0.7) translate(60,60)");
                svg.append("path").attr("d", framePath).attr({
                  "class": "frame " + scope.iconClass, "shape-rendering": "optimizeQuality", "stroke-width": "4px",
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


