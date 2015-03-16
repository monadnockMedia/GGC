'use strict';

angular.module('ggcApp')
  .service('ggcMapper', function ( $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.grid = {
      points: [], hexes: [], hexRadius: 0, width:0,height:0,rows:0,columns:0
    }

    var grid = this.grid;

    this.buildHexes = function(columns, rows, _w, _h){
      var dfd = $q.defer();
      grid.width = _w;
      grid.height = _h;
      grid.columns = columns;
      grid.rows = rows;

      grid.hexRadius = d3.min(
        [_w/((columns + 0.5) * Math.sqrt(3)),
          _h/((rows + 1/3) * 1.5)]
      );

      this.hexBin = d3.hexbin()
        .radius(grid.hexRadius);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          var pt = [grid.hexRadius * j * 1.75 + grid.hexRadius, grid.hexRadius * i * 1.5 + grid.hexRadius];
          grid.points.push(pt);
        }//for j
      }//for i
      grid.hexes = this.hexBin(grid.points);
      dfd.resolve(grid);
      return dfd.promise;
    }

    this.getIndex = function(r,c){
      return r + (c*grid.columns);
    }


  });
