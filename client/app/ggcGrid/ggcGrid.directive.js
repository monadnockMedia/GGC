'use strict';

angular.module('ggcApp')
  .directive('ggcGrid', function (ggcMapper) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {


        ggcMapper.buildHexes(scope.config.grid.cols,scope.config.grid.rows,scope.config.screen.width,scope.config.screen.height).then(function(d){
          scope.grid = ggcMapper.grid;
          scope.hexBin = ggcMapper.hexBin;
          scope.grid.hexScale = 0.8;
          setupSVG();
          drawHexes(scope.grid);

          //watch for icons to be added
          scope.$watch(
            function(){return scope.grid.gridIcons;},
            function(n){
              if(n.length){
                var sel = "."+n[n.length-1].iClass;

                var path =  svg.selectAll(sel);
                svg.selectAll(sel).style({
                  "fill-opacity": 0, fill: "yellow"
                }).transition()
                  .duration(500).style("fill-opacity",1).attr("transform", function(d){return "translate("+d.x+","+d.y+") scale("+1+")"} )
                  .transition().duration(500).style("fill-opacity",0).attr("transform", function(d){return "translate("+d.x+","+d.y+") scale("+scope.grid.hexScale+")"} );
              }
            }, true);

        });

        var container = d3.select(element[0]);
        var iconGrid =  container.append("div").attr({
          "class":"iconGrid"
        });

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
          var hexes = hexGroup.selectAll("g").data(data).enter().append("g")
            .attr("transform", function(d){return "translate("+d.x+","+d.y+")"} )
          hexes
           .append("path")
            .attr("d", function (d) {return   scope.hexBin.hexagon()})
            .attr("transform", function(d){return "scale("+scope.grid.hexScale+")"} )
            .attr("stroke-width", "1px")
            .attr("class", buildClass)

         if(scope.config.debug){
           hexes.append("text").text(function(d){return d.i+","+d.j}).attr("stroke","white").attr("text-anchor","middle");
         }


        }

        function update(newGrid, oldGrid){
          console.log("Grid Update");
        }

        function px(n){
          return  n+"px";
        }
        //classname based on row/column
        function buildClass(d){
          return "hexagon "+ d.iClass;
        }
      }
    };
  });
