'use strict';
var app = angular.module('ggcApp');

app.filter('percent', function () {
    return function (input) {
      return ~~(input*100)+"%";
    };
  });

app.filter('capitalize', function() {
  return function(input) {
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
          output += " &#xe103";
        }
        return output;
      }


      if (team == "energy") {
        for (var i = 0; i < input; i++) {
          output += " &#xe162";
        }
        return output;
      }


      if (team == "economy") {
        for (var i = 0; i < input; i++) {
          //output += "&#xe148 ";
          output += " &#xe148";
        }
        return output;
      }

    }
  }
});

//filter score for panel, return icons and pro/con indicator
app.filter('panelScore', function() {

  return function(input, team) {
    var output = "";
    var icons = {
      economy:"&#xe148",
      energy:"&#xe162",
      environment:"&#xe103"
    };

    if (team!=null) {
      var ic = (input == 0) ? "fa-circle-o" : (input > 0) ? "fa-plus" : "fa-minus" ;
      var scClass = (input == 0) ? "zilch" : (input > 0) ? "up" : "down" ;
      var prefix =  "<i class = 'fa " + ic + " "+scClass+"'></i> ";

      var score = "<span class='"+scClass+"'>";
      for (var i = 0; i < Math.abs(input); i++) {
        //output += "&#xe148 ";
        score += icons[team]+" ";
      }
      score+= "</span>"
      output = prefix+score;
    }
    return output;
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
    return output;

    }
  }
});

app.filter('endObject', function(){
  return function(_endings){

    var ret = {balanced:{},unbalanced:{}};
    _endings.forEach(function(e){
      if(e.balanced){
        ret.balanced = e;
      }else{
        ret.unbalanced[e.team] = e;
      }
    });
    return ret;
  }
})
