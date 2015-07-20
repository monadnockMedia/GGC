'use strict';

angular.module('ggcApp')
  .service('ggcAttractOverlord', function (dealer, $state, $interval) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;
    this.makePop = function(v){
      pop = Popcorn(v);
      pop.on("ended", function(){
        $state.go("game.play.loop");
        dealer.init();
        //dealer.dockOne(dealer.game.currentPlayer,false);

      });

      pop.code({
        start: 0.01,
        end: 12.5,
        onStart: function(){
          dealer.dockAll(true);
          dealer.introMusic.play();
        },
        onEnd: function(){}
        //TODO(Ryan, Ray) I think I fixed this with an ng-class, but we need a state-machine for the docking classes
      }).load();

      var t = $interval(function () {
        $interval.cancel(t);
        pop.play();
      }, 2000);


    }
  });
