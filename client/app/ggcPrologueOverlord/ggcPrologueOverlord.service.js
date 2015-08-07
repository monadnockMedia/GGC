'use strict';

angular.module('ggcApp')
  .service('ggcPrologueOverlord', function (dealer, $state, $interval, ggcMapper) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;
    this.makePop = function(v){
      pop = Popcorn(v);
      //TODO(Ray) try getting the tutorial icons here rather than in dealer
      pop.on("ended", function(){
        $state.go("game.play.loop");
        dealer.init();
        dealer.prologue = false;
        dealer.signIn = false;
        ggcMapper.reset();
      });

      pop.code({
        start: 0.01,
        end: 12.5,
        onStart: function(){
          dealer.dockAll(true);
          dealer.introMusic.play();
        },
        //TODO(Ray) set panel states with ggcGame.setPanelState() or setPanelStates()
        onEnd: function(){$(".environment.fullRetract").removeClass("fullRetract")}
      }).code({
        start: 2,
        end: 5,
        //TODO(Ray) simplify, just call ggcMapper.addPriorityIcon();
        onStart: function(){dealer.placeTutIcon(0);},
        onEnd: function(){dealer.placeTutIcon(16);},
      }).code({
        start:8,
        end: 10,
        onStart: function(){dealer.placeTutIcon(8);},
        onEnd: function(){dealer.placeTutIcon(9);},
      }).code({
        start: 10.5,
        end: 11,
        onStart: function(){dealer.placeTutIcon(15);},
        onEnd: function(){dealer.placeTutIcon(11);},
      }).code({
        start: 11.5,
        end: 12,
        onStart: function(){dealer.placeTutIcon(25);},
        onEnd: function(){dealer.placeTutIcon(20);},
      }).code({
        start: 13.75,
        end: 15.18,
        onStart: function(){$(".economy.fullRetract").removeClass("fullRetract")},
        onEnd: function(){
          //TODO(RAY) Get Rid of JQUERY... grumblegrumble
          $(".energy.fullRetract").removeClass("fullRetract")

        },
      }).code({
        start: 17,
        end: 18,
        onStart: function(){
          $(".arrow").addClass("bounce");
        },
        onEnd: function(){
          $(".arrow").removeClass("bounce");
        },
      }).code({
        start: 19,
        end: 20,
        onStart: function(){
          //TODO(Ray) Can we do this without jquery? Maybe use $scope by passing it in from the directive
          $(".arrow").addClass("bounce");
        },
        onEnd: function(){
          $(".arrow").removeClass("bounce");
        },
      }).code({
        start: 21,
        end: 22,
        onStart: function(){
          dealer.introText = true;
          //TODO(Ray) makeDocked is now on ggcGame
          dealer.makeDocked("environment", false);
        },
        onEnd: function(){
        },
      }).code({
        start: 23,
        end: 24,
        onStart: function(){
          dealer.makeDocked("economy", false);
        },
        onEnd: function(){
        },
      }).code({
        start: 25,
        end: 26,
        onStart: function(){
          dealer.makeDocked("energy", false);
        },
        onEnd: function(){
        },
      }).code({
        start: 27,
        end: 28,
        onStart: function(){
        },
        onEnd: function(){
          dealer.makeDocked("energy", true);
        },
      }).code({
        start: 29,
        end: 30,
        onStart: function(){
          dealer.makeDocked("economy", true);
        },
        onEnd: function(){
          dealer.makeDocked("environment", true);
        },
      }).code({
        start: 32,
        end: 36.25,
        onStart: function(){
          dealer.introText = false;
          dealer.dockOne("environment", false);
          $state.go("game.play.prologue.cards");
        },
        onEnd: function(){dealer.choose("environment",1);},
      }).code({
        start: 38.5,
        end: 40,
        onStart: function(){dealer.vote("environment",1);},
        onEnd: function(){dealer.vote("economy",1);},
      }).code({
        start: 41.5,
        end: 43,
        onStart: function(){
          dealer.vote("energy",0);
          dealer.prologue = true;

        },
        onEnd: function(){
          dealer.dockAll(true);

        },
      }).code({
        start: 44,
        end: 47.5,
        onStart: function(){dealer.signIn = true;},
        //onEnd: function(){dealer.makeDocked("economy", false)},
      }).code({
        start: 48,
        end: 60.5,
        //onStart: function(){dealer.makeDocked("energy", false)},
        onEnd: function(){

          $(".signIn").removeClass("signIn").addClass("retract");
          //dealer.dockAll(true);
        },
      }).code({
        start: 49,
        end:60.9,
        onStart: function(){
          $(".retract").removeClass("retract").addClass("signIn");
        },
        onEnd: function(){
          /*dealer.prologue = false;
          dealer.signIn = false;*/
        },
      }).load()

      var t = $interval(function () {
        $interval.cancel(t);
        pop.play();
      }, 2000);



    }
  });
