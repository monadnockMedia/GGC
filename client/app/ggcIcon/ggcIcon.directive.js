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
          console.log("observe", value);
          ggcUtil.getIcons(value).then(function (res) {
            var icon = res.data;
            //TODO(Ryan)  add further DOM manipulation
           /* scope.compIcon = ggcUtil.trustSVG($compile(icon.icon)(scope, function(e,s){
              var svg = d3.select(e.toArray());

            })[0].outerHTML); */

            scope.icon = icon;
            console.log("ICON",res.data);
          });
          //some action
        });
      }

    };
  })


