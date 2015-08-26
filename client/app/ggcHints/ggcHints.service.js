'use strict';

angular.module('ggcApp')
  .service('ggcHints', function (ggcUtil, $rootScope) {
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

    ggcUtil.getHints().then(function(d){
      d.data.forEach(function(o){
        hints[o.phase] = o.hints;

      });
    });

    function randomHint(p){
      return hints[p][~~(Math.random() * hints[p].length)].text;
    };

    $rootScope.$on("phaseChange", function(scope,arg,c){
      if(hints[arg]){
        playerNames.forEach(function(n){
          var h = playerHints[n];
          h.text = randomHint(arg);
        });
      }

    });

    $rootScope.$on("idle", function(scope,arg){
      if(hints[arg]){
        playerNames.forEach(function(n){
          var h = playerHints[n];
          h.text = randomHint(arg);
        });
      }
    });



  });
