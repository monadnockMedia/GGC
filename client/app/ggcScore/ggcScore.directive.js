
'use strict';

angular.module('ggcApp')
  .directive('ggcScore', function ($filter, d3, ngAudio, $location) {
    return {
      template: '<g ng-transclude>',
      restrict: 'A',
      transclude: true,
      link: function (scope, element, attrs) {
        var team = attrs.team;
        var iconIndex;
        var abs = $location.absUrl();
        var pathEl = element.find("path")[0];
        //debugger;
        var l = pathEl.getTotalLength();
        var group = d3.select(element[0]);
        var step = 38;
        var padding = {x:2,y:15};
        var center = {x:960,y:540};
        var scoreSfx = ngAudio.load("../sound/score_slide.wav");
        var angles = {"environment": -25,"economy" : 0, "energy":25};
        scope.$watch(function() {
          return scope.game.score[team];
        }, update, true);
        //TODO(Ryan/Ray) add second layer group for enter/exit glow.
        function update(newV, oldV) {
          scoreSfx.play();
          console.log(Boolean(newV));
          if (newV.hasOwnProperty("i")) {
            var glyphiconColor = $filter("teamColor")("", team);
            var scoreData = $filter("scoreIconArray")(newV.i, team);
            var previousPoint = pathEl.getPointAtLength(0);
            var nextPoint;
            var initialPosition = {environment: {x:575,y: 900}, economy: {x:950, y:1000}, energy: {x:1370, y:900}};

            var changed = group.selectAll("text").data(scoreData);
            //set the starting point
            changed.enter().append("text").attr({
              //x: initialPosition[team][0],
              //y: initialPosition[team][1],
              transform: function(d,i){
                var pt = initialPosition[team];
                return "translate("+ pt.x+" "+pt.y+" ) rotate("+(angles[team]+90)+")";

              },
              class: team + " glyphIcons",
              opacity: 0.5
            })
              .transition() //add the transition
              ////push the new attributes (could be any xhtml attributes)
              .attr({
                //x: function(d,i){
                //  var newI = i+1;
                //  var pt = pathEl.getPointAtLength(newI*step);
                //
                //  return pt.x;
                //},
                //y: function(d,i){
                //  var newI = i+1;
                //  var pt = pathEl.getPointAtLength(newI*step);
                //
                //  return pt.y+15;
                //}
                transform: function(d,i){
                  var pt = pathEl.getPointAtLength((i+1)*step);
                  return "translate("+(pt.x+padding.x)+" "+(pt.y+padding.y)+" ) rotate("+angles[team]+")";

                },
                opacity: 1
              })
              .attr({})
              .delay(function(d,i){return i*100}) // a delay based on index
              .style("fill", glyphiconColor).style("font-size", "26px").duration(2000).text(function(d){return d});

            group.selectAll("text").data(scoreData).exit()
              .transition().attr({
                //x: initialPosition[team][0],
                //y: initialPosition[team][1],
                transform: function(d,i){
                  var pt = initialPosition[team];
                  return "translate("+ pt.x+" "+pt.y+" ) rotate(-360)";

                },

              })
              .delay(function(d,i){return i*100})
              .style("opacity", 0).style("font-size", "60px").duration(1000).remove();
          }
        }
      }
    };
  });
