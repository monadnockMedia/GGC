'use strict';

angular.module('ggcApp')
  .controller('TutorialCtrl', function ($rootScope, $scope, $window, $interval, $state, ggcGame, ggcSounds) {

    var timers = {};
    // Define an array of Toddler objects
    var tick = 500;
    $scope.frames = {
      2: {
        dur: 6000,
        enter: function () {  //this will be called at the beginning
          ggcGame.setPanelStates("retract");
          ggcSounds.wooshSfx.play();
        },
        exit: function () {  //this will be called when the duration has elapsed
        }
      },
      3: {
        dur: 1000,
        enter: function () {  //this will be called at the beginning
          $(".arrow").addClass("bounce");
        },
        exit: function () {  //this will be called when the duration has elapsed
          $(".arrow").removeClass("bounce");

        }
      },
      5: {
        dur: 1000,
        enter: function () {  //this will be called at the beginning
          $(".arrow").addClass("bounce");
        },
        exit: function () {  //this will be called when the duration has elapsed
          $(".arrow").removeClass("bounce");
        }
      },
      8: {
        dur: 8000,
        enter: function () {  //this will be called at the beginning
          ggcSounds.wooshSfx.play();
        },
        exit: function () {  //this will be called when the duration has elapsed

        }
      },
      11: {
        dur: 3000,
        enter: function () {  //this will be called at the beginning
          $state.go("game.play.tutorial.cards");
        },
        exit: function () {  //this will be called when the duration has elapsed
          ggcGame.setPanelState("environment", 3);
        }
      },
      12: {
        dur: 4000,
        enter: function () {  //this will be called at the beginning

        },
        exit: function () {  //this will be called when the duration has elapsed
          ggcGame.chooseIssue("environment", 1);
          ggcSounds.confirmSfx.play();
          ggcSounds.wooshSfx.play();
        }
      },
      16: {  //this keyframe will execute at 5s
        dur: 5000,
        enter: function () {  //this will be called at the beginning
          ggcSounds.wooshSfx.play();
        },
        exit: function () {  //this will be called when the duration has elapsed
        }
      },
      18: {
        dur: 1000,
        enter: function () {  //this will be called at the beginning
          ggcGame.voteIssue("environment", 1);
          ggcSounds.votePassSfx.play();
        },
        exit: function () {  //this will be called when the duration has elapsed
          ggcGame.voteIssue("economy", 0);
          ggcSounds.voteBlockSfx.play();
        }
      },
      20: {
        dur: 1000,
        enter: function () {  //this will be called at the beginning
          ggcGame.voteIssue("energy", 1);
          ggcSounds.votePassSfx.play();
        },
        exit: function () {  //this will be called when the duration has elapsed

        }
      },
      22: {
        dur: 4000,
        enter: function () {  //this will be called at the beginning
          ggcSounds.wooshSfx.play();
        },
        exit: function () {  //this will be called when the duration has elapsed
        }
      },
      26: {
        dur: 4000,
        enter: function () {  //this will be called at the beginning
          ggcSounds.wooshSfx.play();
        },
        exit: function () {  //this will be called when the duration has elapsed
          //$state.go("game.play.loop");
          $state.go("game.play.loop", {}, {reload: true});
        }
      },
      end: 34
    }

    var clock = $interval(enterFrame, tick);

    function clearTimers() {
      $interval.cancel(clock);
      Object.keys(timers).forEach(function (d) {
        $interval.cancel(timers[d]);
        delete timers[d];
      })
    }

    function enterFrame(t) {

      var frame = t * tick / 1000;
      if (frame >= $scope.frames.end) {
        //alert("amination complete");
        clearTimers();

      }
      var thisFrame = $scope.frames[frame];
      if (thisFrame) {
        thisFrame.active = true;
        if (thisFrame.enter) thisFrame.enter.call();
        timers[frame] = $interval(function () {
          $interval.cancel(timers[frame]);
          thisFrame.active = false;
          if (thisFrame.exit) thisFrame.exit.call();
        }, thisFrame.dur);
      }

    }


    $rootScope.$on("cancelTutorial", function () {
      clearTimers();
      ggcSounds.introMusic.stop();
      $state.go("game.play.loop", {}, {reload: true});
    });
  });
