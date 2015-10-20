
'use strict';

angular.module('ggcApp')
  .directive('ggcScore', function ($filter, d3, ngAudio, $location) {
    return {
      template: '<g ng-transclude>',
      restrict: 'A',
      transclude: true,
      link: function (scope, element, attrs) {
        var team = attrs.team;
        var dur = 700;
        var iconIndex;
        var abs = $location.absUrl();
        var pathEl = element.find("path")[0];
        //debugger;
        var l = pathEl.getTotalLength();
        var group = d3.select(element[0]).append("g");
        var step = 38;
        var padding = {x:2,y:15};
        var center = {x:960,y:540};
        var scoreSfx = ngAudio.load("../sound/score_slide.wav");
        var angles = {"environment": -25,"economy" : 0, "energy":25};
        var changed, enterGroups, exitGroups;

        scope.$watch(function() {
          return scope.game.score[team];
        }, update, true);

        element.on('$destroy', function() {
          group.remove();
          group = null;
          changed.remove();
          changed = null;
          enterGroups.remove();
          enterGroups = null;
          exitGroups.remove();
          exitGroups = null;
        });

        //scope.$watch(function() {
        //  return scope.game.scoreGlow;
        //}, glow, true);

        //TODO(Ryan/Ray) add second layer group for enter/exit glow.
        function update(newV, oldV) {
          scoreSfx.play();
          console.log(Boolean(newV));
          if (newV.hasOwnProperty("i")) {
            var glyphiconColor = $filter("teamColor")("", team);
            var scoreData = $filter("scoreIconArray")(newV.i, team);
            var initialPosition = {environment: {x:575,y: 900}, economy: {x:950, y:1000}, energy: {x:1370, y:900}};

            changed = group.selectAll("g").data(scoreData);
            //set the starting point
            enterGroups = changed.enter().append("g").attr("class","iconGroup");
            exitGroups = changed.exit()

            //enterGroups.append("text").text(function(d){return d}).attr({
            //  class: "glowie"
            //}).style("fill", "white")

            enterGroups.append("text").text(function(d){return d}).attr({
              class: "scoreDupe"
            }).style("fill", "white").style("filter","url("+abs+"#pulse)")
              .transition().delay(dur*4).style("opacity",0)//.style("filter",null);

            enterGroups.append("text").text(function(d){return d}).attr({
              class: team + " glyphIcons",  id: function(d,i){return team+"Score"+i}
            }).style("fill", glyphiconColor);



            enterGroups.attr({
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
                transform: function(d,i){
                  var pt = pathEl.getPointAtLength((i+1)*step);
                  return "translate("+(pt.x+padding.x)+" "+(pt.y+padding.y)+" ) rotate("+angles[team]+")";

                },
                opacity: 1
              })
              .attr({})
              .delay(function(d,i){return i*100}) // a delay based on index
              .duration(dur)

            exitGroups
              .transition().attr({
                //x: initialPosition[team][0],
                //y: initialPosition[team][1],
                transform: function(d,i){
                  var pt = initialPosition[team];
                  return "translate("+ pt.x+" "+pt.y+" ) rotate(-360)";

                },

              })
              .delay(function(d,i){return i*100})
              .style("opacity", 0).duration(dur*4).remove();
            exitGroups
              .selectAll(".scoreDupe").style("fill","red").style("filter","url("+abs+"#pulse)").style("opacity","1");
          }
        }
        //function glow(n,o){
        //  if (n !== o){
        //    if(n == true){
        //      group.selectAll(".glowie").style("opacity","1").transition().delay(dTime).style("filter","url("+abs+"#pop)");
        //    }else{
        //      group.selectAll(".glowie").transition().delay(dTime).style("opacity","0").style("filter",null);
        //    }
        //
        //  }
        //}
        var interval = 100;
        function dTime(d,i,a){
          return i*interval;
        }
      }
    };
  });
