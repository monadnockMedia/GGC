'use strict';

angular.module('ggcApp')
  .service('ggcMapper', function ( $q, ggcUtil) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    this.grid = {
      points: [], hexes: [], gridIcons:[], hexRadius: 0, width:0,height:0,rows:0,columns:0
    }
    this.occupied = [];
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
      for (var i = 0; i<columns*rows; i++){
        this.occupied.push(false);
      }
      this.hexBin = d3.hexbin()
        .radius(grid.hexRadius);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          var pt = [grid.hexRadius * j * 1.75 + grid.hexRadius, grid.hexRadius * i * 1.5 + grid.hexRadius];
          grid.points.push(pt);
        }//for j
      }//for i
      grid.hexes = this.hexBin(grid.points);
      grid.hexes.map(function(h){h.iClass = iconClass(h); return h });
      dfd.resolve(grid);
      return dfd.promise;
    }

    this.getIndex = function(_r,_c){
      var r = _r-1;
      var c = _c-1;
      return r + (c*grid.columns);
    }

    this.randomIndex = function(){
      return ~~(Math.random()*this.grid.hexes.length-1);
    }

    this.putIcon = function(i, _id){
      var hex = this.grid.hexes[i];
      hex.iconId = _id;
      this.grid.gridIcons.push(hex);
      this.occupied[i] = true;
      //this.grid.gridIcons[i] = hex;
    }

    this.addPriorityIcon = function(icon){
      var positions = ggcUtil.shuffle(icon.position);

      var pos;
      var index;
      var positionFound = positions.some(function(d){
        //get index of each preferred position
        var thisPos = d.split(",");
        var i = self.getIndex(+thisPos[0],+thisPos[1]);

        if(!self.occupied[i]){
          pos = thisPos;
          index = i;
          return true;
        }else{
          return false;
        }
      });

      if(positionFound){
        var hex = self.grid.hexes[index];
        hex.iconId = icon._id;
        self.grid.gridIcons.push(hex);
        self.occupied[index] = true;
      }else{
        throw("All preferred positions are occupied");
      }




    };



    function iconClass(h){
      return "r"+h.i+"c"+ h.j;
    }

    function clone(o){
      return JSON.parse(JSON.stringify(o));
    }


  });
