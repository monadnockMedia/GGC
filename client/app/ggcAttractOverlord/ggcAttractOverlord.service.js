'use strict';

angular.module('ggcApp')
  .service('ggcAttractOverlord', function (dealer, $state, $interval, ggcGame) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;

    this.makePop = function(v){
      pop = Popcorn(v);
      pop.on("ended", function(){
        $state.go("game.play.attract");
        pop.play();
        //dealer.init();
        //dealer.dockOne(dealer.game.currentPlayer,false);
      });

      var t = $interval(function () {
        $interval.cancel(t);
        pop.play();
        pop.loop(true);
        ggcGame.setPanelStates("signIn");
        ggcGame.setGulfState(0);

      }, 2000);

    }
  });
