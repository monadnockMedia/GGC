'use strict';

angular.module('ggcApp')
  .service('ggcPrologueOverlord', function (dealer, $state, $interval, ggcMapper, ggcGame) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;
    this.makePop = function(v){
      pop = Popcorn(v);




      //TODO(Ray) try getting the tutorial icons here rather than in dealer
      pop.on("ended", function(){
        $state.go("game.play.loop");

        dealer.prologue = false;
        dealer.signIn = false;
        ggcMapper.reset();
      });

      pop.code({
        start: 0.01,
        end: 12.5,
        onStart: function(){
          ggcGame.setPanelStates(2);
          //dealer.introMusic.play();
        },
        //TODO(Ray) Remove skip tutorial buttons here
        onEnd: function(){ggcGame.setPanelState("environment", "retract");}
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
        onStart: function(){ggcGame.setPanelState("economy", "retract");},
        onEnd: function(){
          ggcGame.setPanelState("energy", "retract");
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
          ggcGame.setPanelState("environment", 3);
        },
        onEnd: function(){
        },
      }).code({
        start: 23,
        end: 24,
        onStart: function(){
          ggcGame.setPanelState("economy", 3);
        },
        onEnd: function(){
        },
      }).code({
        start: 25,
        end: 26,
        onStart: function(){
          ggcGame.setPanelState("energy", 3);
        },
        onEnd: function(){
        },
      }).code({
        start: 27,
        end: 28,
        onStart: function(){
        },
        onEnd: function(){
          ggcGame.setPanelState("environment", "retract");
        },
      }).code({
        start: 29,
        end: 30,
        onStart: function(){
          ggcGame.setPanelState("economy", "retract");
        },
        onEnd: function(){
          ggcGame.setPanelState("energy", "retract");
        },
      }).code({
        start: 32,
        end: 36.25,
        onStart: function(){
          dealer.introText = false;
          ggcGame.setPanelState("environment", "");
          $state.go("game.play.prologue.cards");
        },
        onEnd: function(){ggcGame.choose("environment",1);},
      }).code({
        start: 38.5,
        end: 40,
        onStart: function(){ggcGame.vote("environment",1);},
        onEnd: function(){ggcGame.vote("economy",1);},
      }).code({
        start: 41.5,
        end: 43,
        onStart: function(){
          ggcGame.vote("energy",0);
          dealer.prologue = true;

        },
        onEnd: function(){
          ggcGame.dockAll(true);

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
          ggcGame.setPanelStates("retract");
          //dealer.dockAll(true);
        },
      }).code({
        start: 49,
        end:60.9,
        onStart: function(){
          ggcGame.setPanelStates("signIn");
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
