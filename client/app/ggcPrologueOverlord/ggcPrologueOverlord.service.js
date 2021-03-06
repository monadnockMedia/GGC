'use strict';

angular.module('ggcApp')
  .service('ggcPrologueOverlord', function (ggcUtil, dealer, $state, $interval, ggcMapper, ggcGame, ggcSounds) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;
    var icons;


    function ended(){
      //dealer.init();
      //ggcSounds.introMusic.stop();
      destroy();
      $state.go("game.play.tutorial", {}, {reload:false});
      ggcGame.setGulfState(1);
      //dealer.prologue = false;
      //dealer.signIn = false;
      ggcMapper.reset();
    }
    function addIcon(i) {
      //ggcMapper.putIcon(ggcMapper.randomIndex(), icon._id);

      var icon = icons[i];
      ggcMapper.addPriorityIcon(icon);

    }
    this.ended = ended;

    function destroy(){
      Popcorn.destroy(pop);
    };

    this.destroy = destroy;

    this.makePop = function (v) {
      pop = Popcorn(v);

      ggcUtil.getIcons().then(function (r) {
        icons = r.data.filter(function(d){return d.tutorial});
        pop.play();
        ggcSounds.introMusic.play();
      });

      //TODO(Ray) try getting the tutorial icons here rather than in dealer
      pop.on("ended", function () {
        ended();
      });



      pop.on("playing", function () {
        ggcGame.setPanelStates(2);
      });

      pop.code({
        start: 0.2,
        end: 9,
        onStart: function () {



        },
        //TODO(Ray) Remove skip tutorial buttons here
        onEnd: function () {
          ggcGame.setPanelStates(0);

        }
      }).code({
        start: 2,
        end: 5,
        //TODO(Ray) simplify, just call ggcMapper.addPriorityIcon();
        onStart: function () {
        addIcon(0);
        },
        onEnd: function () {
          addIcon(1);
        },
      }).code({
        start: 8,
        end: 10,
        onStart: function () {
          addIcon(2);

        },
        onEnd: function () {
          addIcon(3);

        },
      }).code({
        start: 10.5,
        end: 11,
        onStart: function () {
          addIcon(4);
          ggcGame.setGulfState(1);

        },
        onEnd: function () {
          addIcon(5);

        },
      }).code({
        start: 11.5,
        end: 12,
        onStart: function () {
          addIcon(6);

        },
        onEnd: function () {
          addIcon(7);
        }
      }).code({
        start: 12.5,
        end: 13,
        onStart: function () {
          ggcGame.setPanelState("environment", "retract");
        },
      }).code({
        start: 13.75,
        end: 15.18,
        onStart: function () {
          ggcGame.setPanelState("economy", "retract");
        },
        onEnd: function () {
          ggcGame.setPanelState("energy", "retract");
        },
      }).code({
        start: 17,
        end: 18,
        onStart: function () {
          $(".arrow").addClass("bounce");
        },
        onEnd: function () {
          $(".arrow").removeClass("bounce");
        },
      }).code({
        start: 19,
        end: 20,
        onStart: function () {
          //TODO(Ray) Can we do this without jquery? Maybe use $scope by passing it in from the directive
          $(".arrow").addClass("bounce");
        },
        onEnd: function () {
          $(".arrow").removeClass("bounce");
        },
      }).code({
        start: 21,
        end: 22,
        onStart: function () {
          dealer.introText = true;
          ggcGame.setPanelState("environment", 2);
        },
        onEnd: function () {
        },
      }).code({
        start: 23,
        end: 24,
        onStart: function () {
          ggcGame.setPanelState("economy", 2);
        },
        onEnd: function () {
        },
      }).code({
        start: 25,
        end: 26,
        onStart: function () {
          ggcGame.setPanelState("energy", 2);
        },
        onEnd: function () {
        },
      }).code({
        start: 27,
        end: 28,
        onStart: function () {
        },
        onEnd: function () {
          ggcGame.setPanelState("environment", "retract");
        },
      }).code({
        start: 29,
        end: 30,
        onStart: function () {
          ggcGame.setPanelState("economy", "retract");
        },
        onEnd: function () {
          ggcGame.setPanelState("energy", "retract");
        },
      }).code({
        start: 32,
        end: 36.25,
        onStart: function () {
          dealer.introText = false;
          ggcGame.setPanelState("environment", 3);
          $state.go("game.play.prologue.cards");
        },
        onEnd: function () {
          ggcGame.chooseIssue("environment", 1);
          ggcSounds.panelSfx.play();

        },
      }).code({
        start: 38.5,
        end: 40,
        onStart: function () {
          ggcGame.voteIssue("environment", 1);
          ggcSounds.votePassSfx.play();
        },
        onEnd: function () {
          ggcGame.voteIssue("economy", 1);
          ggcSounds.votePassSfx.play();
        },
      }).code({
        start: 41.5,
        end: 42,
        onStart: function () {
          ggcGame.voteIssue("energy", 0);
          ggcSounds.voteBlockSfx.play();
          dealer.prologue = true;


        },
        onEnd: function () {
          ggcGame.dockAll(true);
          $state.go("game.play.prologue");

        },
      }).code({
        start: 48,
        end: 47.5,
        onStart: function () {
          ggcGame.setPanelStates("signIn");
        },
        //onEnd: function(){dealer.makeDocked("economy", false)},
      }).code({
        start: 48,
        end: 60.5,
        onStart: function(){},  //temporary
        onEnd: function () {

          //dealer.dockAll(true);
        },
      }).code({
        start: 49,
        end: 60.9,
        onStart: function () {
          //ggcGame.setPanelStates("signIn");
        },
        onEnd: function () {
          /*dealer.prologue = false;
           dealer.signIn = false;*/
        },
      }).load();
      //pop.on("loadeddata", function () {
      //  pop.play();
      //  ggcSounds.introMusic.play();
      //});
      //pop.play();
      //var t = $interval(function () {
      //  $interval.cancel(t);
      //  pop.play();
      //}, 2000);


    }
  });
