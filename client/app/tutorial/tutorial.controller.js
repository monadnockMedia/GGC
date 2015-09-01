'use strict';

angular.module('ggcApp')
  .controller('TutorialCtrl', function ($scope, $interval) {
    alert("¯\_(ツ)_/¯");
    var timers = {};
    // Define an array of Toddler objects
    var tick = 500;
    $scope.frames = {
      2:{
        dur: 5000
      },
      4:{
        dur: 2000
      },
      5:{
        dur: 3000
      },
      7:{
        dur: 3000
      },
      end:10
    }

    var clock = $interval(enterFrame, tick);
    function clearTimers(){
      $interval.cancel(clock);
      Object.keys(timers).forEach(function(d){
        $interval.cancel(d);
      })
    }
    function enterFrame(t){

      var frame = t*tick/1000;
      if(frame >= $scope.frames.end){
        alert("amination complete");
        clearTimers();

      }
      var thisFrame = $scope.frames[frame];
      if(thisFrame){
        thisFrame.active = true;
        timers[frame] = $interval(function(){thisFrame.active=false},thisFrame.dur);
      }

    }
  });
