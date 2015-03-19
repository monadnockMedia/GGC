'use strict';
var app = angular.module('ggcApp');

app.filter('percent', function () {
    return function (input) {
      return ~~(input*100)+"%";
    };
  });

app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

app.filter('identify', function() {
  return function(input) {
    if (input!=null) {
      if (input == "environment")
        return "#environmentPath";

      if (input == "energy")
        return "#energyPath";

      if (input == "economy")
        return "#economyPath";
    }
  }
});

app.filter('scoreIcons', function() {
  return function(input, team) {
    var output = "";

    if (team!=null) {
      if (team == "environment") {
        for (var i = 0; i < input; i++) {
          output += "&#xe103 ";
        }
        return output;
      }


      if (team == "energy") {
        for (var i = 0; i < input; i++) {
          output += "&#xe162 ";
        }
        return output;
      }


      if (team == "economy") {
        for (var i = 0; i < input; i++) {
          //output += "&#xe148 ";
          output += "&#xe225 ";
        }
        return output;
      }

    }
  }
});

app.filter('teamColor', function() {
  return function(input, team) {
    var output = "";

    if (team!=null) {
      if (team == "environment") {
        return "#2fd418";
      }


      if (team == "energy") {
        return "#4e4efc";
      }


      if (team == "economy") {
        return "#fca204";

      }


    }
  }
});
