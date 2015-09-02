'use strict';

angular.module('ggcApp')
  .service('ggcGovernor', function (ggcGame, $rootScope, $timeout, ggcHints) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var players = {};
    var phase;
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
      clearStrikes();
      phase = arg;
      resetTimers();
      //cancel timers for inactive players
      if(phase == "choice"){
        ggcGame.eachPlayer(function(p){
          if(p != cp){
            active(p);
          }
        })
      }1

    });

    function active(p){
      clearStrike(p);
      $timeout.cancel(players[p].timer);
      players[p].timer = null;
      ggcHints.hideHint(p);

    }

    function idle(p){

      var player = players[p];
      $rootScope.$emit("idle",p,player.strike);
      player.strike++;
      resetTimer(p);
      //strikes[player.strike++].call(null,p);
    }

    function resetTimer(p){
      $timeout.cancel(players[p].timer);
      players[p].timer = null;
      players[p].timer = $timeout(function(){idle(p)}, durs[players[p].strike]);
    }



    function resetTimers(){
      ggcGame.eachPlayer(
       function(p){
          resetTimer(p);
       }

      )
    }


    this.init = init;
    this.active = active;
  });
