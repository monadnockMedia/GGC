'use strict';

angular.module('ggcApp')
  .directive('ggcGrid', function (ggcMapper) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.grid = {};

        ggcMapper.buildHexes(scope.config.grid.cols,scope.config.grid.rows,800,500).then(function(d){
          scope.grid = ggcMapper.grid;
          scope.hexBin = ggcMapper.hexBin;
          scope.grid.hexScale = 0.8;
          setupSVG();
          drawHexes(scope.grid);
        })

        var container = d3.select(element[0]);
        var iconGrid =  container.append("div").attr({
          "class":"iconGrid"
        })

        var svg = container.append("div")
          .attr("class","plane")
          .append("svg").attr("class", "hexGrid");

        var hexGroup = svg.append("g").attr("class", "hexes");

        //watch statements
        scope.$watch('grid', update);



        //useful functions
        function setupSVG(){
          svg.attr({
            width: scope.grid.width, height: scope.grid.height
          })
        }

        function drawHexes(_grid){
          var data = _grid.hexes;
          hexGroup.selectAll(".hexagon")
            .data(data)
            .enter().append("path")
            .attr("d", function (d) {return   scope.hexBin.hexagon()})
            .attr("transform", function(d){return "translate("+d.x+","+d.y+") scale("+scope.grid.hexScale+")"} )
            .attr("stroke-width", "1px")
            .attr("class", buildClass)

          var iconsize = scope.grid.hexRadius;
          var iconoffset = -scope.grid.hexRadius/2;

         /* iconGrid.selectAll(".iconHex")
            .data(data)
            .enter().append("div")
            .attr("class","iconHex")
            .style({

              width: px(iconsize), height: px(iconsize),
              "left": function(d){return px(d.x+iconoffset)},     "top": function(d){return px(d.y+iconoffset)}


            }).append("ggc-icon").attr("icon-id","54de6c38e4046d3846c96a0b").attr("frame","true"); */

        }

        function update(newGrid, oldGrid){
          console.log("Grid Update");
        }

        function px(n){
          return  n+"px";
        }

        function buildClass(d){
          return "hexagon r"+d.i+" c"+d.j;
        }
      }
    };
  });
