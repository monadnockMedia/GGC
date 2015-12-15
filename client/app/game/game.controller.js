'use strict';

angular.module('ggcApp')
  .controller('GameCtrl', function ($scope, $http, ggcSounds, ggcGovernor, ggcUtil, $rootScope, dealer, ggcGame, hotkeys, $location, $interval, $state, nwkiosk, ggcPrologueOverlord,ggcAttractOverlord, _game) {

    $scope.preview = {};
    $scope.preview.hideNavbar = false;

    $scope.preview.previewStates = ["cards", "icons", "test", "game", "screen"];

    $scope.preview.currentCard = 0;
    $scope.getVideoURL = ggcUtil.getVideoURL;

    $scope.trust = ggcUtil.trustSVG;

    $rootScope.buttons = {lockout: false};


    $scope.pregameClass = function (_c) {

      var c = (_c === "extend" ) ? "signIn" : _c;
      return c;
    }
    $scope.printObject = ggcUtil.printObject;

    $scope.dealer = dealer
    $scope.isArray = ggcUtil.isArray;

    $scope.game = ggcGame.game;
    $scope.$watch(function () {
      return $scope.game.phase;
    }, function (val) {
      if (val == "choice") {
        ggcSounds.wooshSfx.play();
      }
      //debugger;
    })

    $scope.tutorial = false;
    $scope.$watch(function () {
      return $state.current.name;
    }, function (val) {
      if (val == "game.play.tutorial.cards") {
        $scope.tutorial = true;
        //console.log("Tutorial = true");
      } else {
        $scope.tutorial = false;
        //console.log("Tutorial = false");
      }
      //debugger;
    })

    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;


    function bindKeys() {

      hotkeys.bindTo($scope)
        .add({
          combo: '0',
          description: 'Environment Select 1',
          callback: function () {
            btnHandler("environment", 0)
          }
        })
        .add({
          combo: '1',
          description: 'Environment Select 2',
          callback: function () {
            btnHandler("environment", 1)
          }
        })

        .add({
          combo: '2',
          description: 'Economy Select 1',
          callback: function () {
            btnHandler("economy", 0)
          }
        })
        .add({
          combo: '3',
          description: 'Environment Select 2',
          callback: function () {
            btnHandler("economy", 1)
          }
        })

        .add({
          combo: '4',
          description: 'Energy Select 1',
          callback: function () {
            btnHandler("energy", 0)
          }
        })
        .add({
          combo: '5',
          description: 'Energy Select 2',
          callback: function () {
            btnHandler("energy", 1)
          }
        })
        .add({
          combo: 'R',
          description: 'reset',
          callback: function () {
            //console.log("RESET");
            dealer.reset();
          }
        })
        .add({
          combo: 'M',
          description: 'Print Model',
          callback: function () {
            //console.log($scope.game);
          }
        })
        .add({
          combo: 'm',
          description: 'Pretty Print Model',
          callback: function () {
            //console.log(ggcUtil.printObject($scope.game));

          }
        })
        .add({
          combo: 'd',
          description: 'Toggles developer console',
          callback: function () {
            nwkiosk.toggleDevTools();

          }
        })
        .add({
          combo: 'k',
          description: 'Toggles kiosk mode',
          callback: function () {
            $rootScope.config.kiosk = !$rootScope.config.kiosk;

          }
        })
        .add({
          combo: 'p',
          description: 'pause AI',
          callback: function () {
            //console.log("PAUSE AI COMMAND")
            ggcGovernor.pause();

          }
        })

    }

    function btnHandler(t, i) {
      if (!$rootScope.buttons.lockout) {
        if ($state.current.name == "game.play.attract") {
          ggcGame.setPanelStates("fullRetract");
          //ggcAttractOverlord.destroy();
          $state.go("game.play.prologue", {}, true);
        } else if ($state.current.name == "game.play.prologue") {
          ggcPrologueOverlord.ended();
        } else if ($state.current.name == "game.play.tutorial") {
          $rootScope.$emit("cancelTutorial");
        } else if ($state.current.name == "game.play.loop") {
          dealer.playerChoice(t, i);
        }
      }
    }

    bindKeys();
    dealer.init();

  });
