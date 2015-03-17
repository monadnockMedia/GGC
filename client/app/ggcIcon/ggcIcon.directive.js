'use strict';

angular.module('ggcApp')
  .directive('ggcIcon', function (ggcUtil, $compile) {
    return {
      templateUrl: 'app/ggcIcon/ggcIcon.html',
      restrict: 'EA',
      scope:{
        "iconId":'@'
      },
      link: function (scope, element, attrs) {
        var width = element.parent().width();
        var padding = 10;



        attrs.$observe('iconId', function(value) {
          scope.trust = ggcUtil.trustSVG;
          ggcUtil.getIcons(value).then(function (res) {
            var icon = res.data;
            //TODO(Ryan)  add further DOM manipulation
            var iconElement = angular.element(icon.icon);


           var svg = d3.selectAll(iconElement);
            svg.append("circle").attr({
              cx: 150, cy: 150, r: 70, stroke: "blue", fill: "none"
            })

            scope.compIcon = iconElement[0].outerHTML;
            scope.icon = icon;
          });
          //some action
        });
      }

    };
  })


