'use strict';

angular.module('ggcApp')
  .directive('ggcGrid', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {


        console.log("DIRR", scope);
        element.text('this is the ggcGrid directive');
        var container = d3.select(element[0]);

        var iconGrid =  container.append("div").attr({
          "class":"iconGrid"
        })

        var svg = container.append("div")
          .attr("class","plane")
          .append("svg").attr("class", "hexGrid");

        var hexGroup = svg.append("g").attr("class", "hexes");

        scope.$watch('grid', renderHexes);
        scope.$watch('SVGAttr', setupSVG);

        function renderHexes(newGrid, oldGrid){
          if(!svg.attr("width")){
            svg.attr({
              width: newGrid.width, height: newGrid.height
            })
          }
          var data = newGrid.hexes;



          hexGroup.selectAll(".hexagon")
            .data(data)
            .enter().append("path")
            .attr("d", function (d) {return   scope.hexBin.hexagon()})
            .attr("transform", function(d){return "translate("+d.x+","+d.y+") scale("+scope.grid.hexScale+")"} )
            .attr("stroke-width", "1px")
            .attr("class", buildClass)

          var iconsize = scope.grid.hexRadius;
          var iconoffset = -scope.grid.hexRadius/2;

          container.selectAll(".iconHex")
            .data(data)
            .enter().append("div")
            .attr("class","iconHex")
            .style({

              width: iconsize+"px", height: iconsize+"px",
            "-webkit-transform": "translateZ('-250px')"


            })/*
            .style({
              left: function(d){return d.x+iconoffset+"px"},  top: function(d){return d.y+iconoffset+"px"},
              width: iconsize+"px", height: iconsize+"px"

            })*/


        }

        function setupSVG(_config){
          svg.attr(_config);
        }

        function buildClass(d){
          return "hexagon r"+d.i+" c"+d.j;
        }
      }
    };
  });
