'use strict';

angular.module('ggcApp')
  .service('ggcPrologueOverlord', function (dealer, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;
    this.makePop = function(v){
      pop = Popcorn(v);
      pop.on("ended", function(){
        $state.go("game.play.loop");
        dealer.dockOne(dealer.game.currentPlayer,false);
      });
      pop.play();

      pop.code({
        start: 0.01,
        end: 12,
        onStart: function(){dealer.dockAll(true)},
        onEnd: function(){$(".environment.fullRetract").removeClass("fullRetract")},
      }).code({
        start: 2,
        end: 2.75,
        onStart: function(){dealer.placeTutIcon(0);},
        onEnd: function(){dealer.placeTutIcon(10);},
      }).code({
        start: 3.5,
        end: 4.25,
        onStart: function(){dealer.placeTutIcon(2);},
        onEnd: function(){dealer.placeTutIcon(9);},
      }).code({
        start: 5,
        end: 5.75,
        onStart: function(){dealer.placeTutIcon(8);},
        onEnd: function(){dealer.placeTutIcon(5);},
      }).code({
        start: 6.5,
        end: 7.25,
        onStart: function(){dealer.placeTutIcon(6);},
        onEnd: function(){dealer.placeTutIcon(7);},
      }).code({
        start: 12.75,
        end: 13.5,
        onStart: function(){$(".economy.fullRetract").removeClass("fullRetract")},
        onEnd: function(){$(".energy.fullRetract").removeClass("fullRetract")},
      }).code({
        start: 17.5,
        end: 18.5,
        onStart: function(){dealer.makeDocked("environment", false)},
        onEnd: function(){dealer.makeDocked("economy", false)},
      }).code({
        start: 19.5,
        end: 21,
        onStart: function(){dealer.makeDocked("energy", false)},
        onEnd: function(){dealer.dockAll(true)},
      }).code({
        start: 23,
        end: 25,
        onStart: function(){dealer.dockOne("environment", false)},
        onEnd: function(){dealer.dockAll(true)},
      }).code({
        start: 26,
        end: 32,
        onStart: function(){dealer.dockAll(false)},
        onEnd: function(){dealer.dockAll(true)},
      }).code({
        start: 37,
        end: 37.5,
        onStart: function(){dealer.makeDocked("environment", false)},
        onEnd: function(){dealer.makeDocked("economy", false)},
      }).code({
        start: 38,
        end: 48,
        onStart: function(){dealer.makeDocked("energy", false)},
        onEnd: function(){dealer.dockAll(true)},
      })
    }
  });
