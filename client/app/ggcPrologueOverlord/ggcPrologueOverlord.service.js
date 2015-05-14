'use strict';

angular.module('ggcApp')
  .service('ggcPrologueOverlord', function (dealer, $state, $interval) {
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
        onStart: function(){dealer.dockAll(true)},
        onEnd: function(){$(".environment.fullRetract").removeClass("fullRetract")}
        //TODO(Ryan, Ray) I think I fixed this with an ng-class, but we need a state-machine for the docking classes
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
        start: 13.75,
        end: 15.18,
        onStart: function(){$(".economy.fullRetract").removeClass("fullRetract")},
        onEnd: function(){
          //TODO(RAY) Get Rid of JQUERY... grumblegrumble
          //TODO(RYAN) better panel state controller
          $(".energy.fullRetract").removeClass("fullRetract")

        },
      }).code({
        start: 23.5,
        end: 27.25,
        onStart: function(){
          dealer.dockOne("environment", false);
          $state.go("game.play.prologue.cards");
        },
        onEnd: function(){dealer.choose("environment",1);},
      }).code({
        start: 29.5,
        end: 31,
        onStart: function(){dealer.vote("environment",1);},
        onEnd: function(){dealer.vote("economy",1);},
      }).code({
        start: 32.5,
        end: 34,
        onStart: function(){dealer.vote("energy",0);},
        onEnd: function(){dealer.dockAll(true)},
      }).code({
        start: 38,
        end: 38.5,
        //onStart: function(){dealer.makeDocked("environment", false)},
        //onEnd: function(){dealer.makeDocked("economy", false)},
      }).code({
        start: 39,
        end: 50,
        //onStart: function(){dealer.makeDocked("energy", false)},
        onEnd: function(){dealer.dockAll(true)},
      }).load()

      var t = $interval(function () {
        $interval.cancel(t);
        pop.play();
      }, 2000);



    }
  });
