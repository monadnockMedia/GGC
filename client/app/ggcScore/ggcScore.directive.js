
'use strict';

angular.module('ggcApp')
  .directive('ggcScore', function ($filter, d3, ngAudio) {
    return {
      template: '<g ng-transclude>',
      restrict: 'A',
      transclude: true,
      link: function (scope, element, attrs) {
        var team = attrs.team;

        var pathEl = element.find("path")[0];
        //debugger;
        var l = pathEl.getTotalLength();
        var group = d3.select(element[0]);
        var step = 35;

        var scoreSfx = ngAudio.load("../sound/score_slide.wav");

        scope.$watch(function() {
          return scope.game.score[team];
        }, update, true);

        function update(newV, oldV) {
          scoreSfx.play();
          console.log(Boolean(newV));
          if (newV.hasOwnProperty("i")) {
            var glyphiconColor = $filter("teamColor")("", team);
            var scoreData = $filter("scoreIconArray")(newV.i, team);

            var glyphIconPOS = {environment: [575, 900], economy: [950, 1000], energy: [1370, 900]};

            var changed = group.selectAll("text").data(scoreData);
            //set the starting point
            changed.enter().append("text").attr({
              x: glyphIconPOS[team][0],
              y: glyphIconPOS[team][1],
              class: team + " glyphIcons",
            }).transition() //add the transition
              //push the new attributes (could be any xhtml attributes)
              .attr({
                x: function(d,i){
                  var newI = i+1;
                  var pt = pathEl.getPointAtLength(newI*step);

                  return pt.x;
                },
                y: function(d,i){
                  var newI = i+1;
                  var pt = pathEl.getPointAtLength(newI*step);

                  return pt.y+15;
                }
              }).style("fill", glyphiconColor).style("font-size", "30px").duration(2000).text(function(d){return d});

            group.selectAll("text").data(scoreData).exit().transition().attr({
              x: glyphIconPOS[team][0],
              y: glyphIconPOS[team][1],

            }).style("opacity", 0.3).style("font-size", "60px").duration(1000).remove();
          }
        }
      }
    };
  });
