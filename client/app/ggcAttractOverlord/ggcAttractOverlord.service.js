'use strict';

angular.module('ggcApp')
  .service('ggcAttractOverlord', function (dealer, $state, $interval, ggcGame) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;

    this.makePop = function(v){
      pop = Popcorn(v);



      var t = $interval(function () {
        $interval.cancel(t);
        pop.loop(true);
        pop.play();
        ggcGame.dockAll(false);
        ggcGame.setGulfState(0);
      }, 2000);

    };
    this.destroy = function(){
      Popcorn.destroy(pop);
    }
  });
