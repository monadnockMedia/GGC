'use strict';

angular.module('ggcApp')
  .service('ggcPrologueOverlord', function (dealer, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;
    this.makePop = function(v){
      pop = Popcorn(v);
      pop.on("ended", function(){$state.go("game.play.loop")});
      pop.play();

      pop.code({
        start: 1,
        end: 3,
        onStart: function(){dealer.dockAll(true)},
        onEnd: function(){dealer.dockAll(false)},
      }).code({
        start: 4,
        end: 5,
        onStart: function(){dealer.dockAll(true)},
        onEnd: function(){dealer.dockAll(false)},
      })
    }
  });
