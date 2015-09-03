'use strict';

angular.module('ggcApp')
  .service('ggcGovernor', function (ggcGame, $rootScope, $timeout, ggcHints) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var players = {};
    var phase;
    var timedPhases = ["vote","choice"];
    var durs = $rootScope.config.governor.durs || [5000,5000,5000,5000];

    function init(){
      ggcGame.eachPlayer(function(k){
        players[k] = {strike:0};
      });
    };

    function clearStrikes(){
      ggcGame.eachPlayer(function(p){
        clearStrike(p);
      })
    }

    function clearStrike(p){
      players[p].strike = 0;
    }
    $rootScope.$on("phaseChange", function(scope,arg,cp){

      phase = arg;
      var timedPhase = timedPhases.indexOf(phase);
      if($rootScope.currentState == "game.play.loop" && timedPhases.indexOf(phase) >= 0){
        //we're in the loop, and a phase that needs timing

        clearStrikes();

        resetTimers();
        if(phase == "choice"){
          ggcGame.eachPlayer(function(p){
            if(p != cp){
              active(p);
            }
          })
        }
      }else{
        //we're in the prologue, tutorial, etc
        //or we are in  phase not in timedPhases
        killTimers();
      }


    });

    function active(p){
      clearStrike(p);
      killTimer(p);
    }

    function idle(p){
      var player = players[p];
      $rootScope.$emit("idle",p,player.strike);
      player.strike++;
      resetTimer(p);
      //strikes[player.strike++].call(null,p);
    }

    function resetTimer(p){
      killTimer(p);
      players[p].timer = $timeout(function(){idle(p)}, durs[players[p].strike]);
    }
    function killTimer(p){
      $timeout.cancel(players[p].timer);
      players[p].timer = null;
      //ggcHints.hideHint(p);
    }

    function killTimers(){
      ggcGame.eachPlayer(
        function(p){
          killTimer(p);
        }

      )
    }
    function resetTimers(){
      ggcGame.eachPlayer(
       function(p){
          resetTimer(p);
       }

      )
    }
    var paused = false;
    this.pause=function(){
      (paused) ? killTimers() : resetTimers();
      paused = !paused;
    };

    this.init = init;
    this.active = active;
  });
