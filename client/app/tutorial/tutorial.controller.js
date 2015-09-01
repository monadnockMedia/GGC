'use strict';

angular.module('ggcApp')
  .controller('TutorialCtrl', function ($scope, $window, $interval) {

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
      5:{  //this keyframe will execute at 5s
        dur: 3000,  //it will last for 3000ms
        enter: function(){  //this will be called when the duration has elapsed
          $window.alert("enter");
        },
        exit: function(){  //this will be called when the duration has elapsed
          $window.alert("¯\_(ツ)_/¯");
        }
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
        $interval.cancel(timers[d]);
        delete timers[d];
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
        if(thisFrame.enter) thisFrame.enter.call();
        timers[frame] = $interval(function(){
          $interval.cancel(timers[frame]);
          thisFrame.active=false;
          if(thisFrame.exit) thisFrame.exit.call();
        },thisFrame.dur);
      }

    }
  });
