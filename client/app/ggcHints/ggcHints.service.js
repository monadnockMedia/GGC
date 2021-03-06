'use strict';

angular.module('ggcApp')
  .service('ggcHints', function (ggcUtil, $rootScope, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var bareHint = {visible: false, text:""};
    var playerHints = {
      energy: angular.copy(bareHint),
      economy: angular.copy(bareHint),
      environment: angular.copy(bareHint)
    };
    var playerNames = Object.keys(playerHints);
    this.playerHints = playerHints;
    var hints = {};
    var hintDur = $rootScope.config.hints.dur || 2000;
    var phase;
    var instructions = $rootScope.config.instructions || {
        choice: "Touch an icon below to choose your issue.",
        vote: "Touch 'yes' or 'no' below to vote.",
        AI: "If you do not act soon, the computer will take over.",
        AIOverride: "Touch 'Override' at any time to join the game"
      };

    ggcUtil.getHints().then(function(d){
      d.data.forEach(function(o){
        hints[o.phase] = o.hints;

      });
    });

    function randomHint(p){
      return hints[p][~~(Math.random() * hints[p].length)].text;
    };


    $rootScope.$on("phaseChange", function(scope,arg,c){
      phase = arg;
      if(hints[arg]){
        playerNames.forEach(function(n){

          var h = playerHints[n];
          $timeout.cancel(h.timer);
          h.text = randomHint(arg);
          h.visible = false;
          h.timer = null;
        });
      }

    });


    function setAI(p,b){
      playerHints[p].ai = b;
    }
    this.setAI = setAI;
    function isAI(p){
      return playerHints[p].ai;
    }

    $rootScope.$on("idle", function(scope,p,s){

      if (idleFunctions[s]) idleFunctions[s].call(null,p);
    });

    var idleFunctions = {
      0: function(p){
        (isAI(p)) ? warnInstruct(p,"AIOverride") : showHint(p,phase);
      },
      1: function(p){
        (isAI(p)) ? warnInstruct(p,"AIOverride") : warnInstruct(p,phase);
      },
      2: function(p){
        (isAI(p)) ? warnInstruct(p,"AIOverride") : warnInstruct(p,"AI");
      }
    };



    var warnInstruct = function(p,k){
      var hint = playerHints[p];
      hint.text = instructions[k];
      showHint(p);
    };

    var showHint = function(p){
      setHint(p,true);
    };

    var hideHint = function(p){
      setHint(p,false);
    };

    var setHint = function(p,b){
      playerHints[p].visible = b;
      if(b){
        playerHints.timer = ggcUtil.wait(function(){hideHint(p)},hintDur);
      }
    };

    this.showHint = showHint;
    this.hideHint = hideHint;
    this.setHint = setHint;



  });
