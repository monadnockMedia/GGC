'use strict';

angular.module('ggcApp')
  .controller('GameCtrl', function ($scope, $http, ngAudio, ggcUtil, $rootScope, dealer, ggcGame, hotkeys, $location, $interval, $state, nwkiosk, ggcPrologueOverlord) {
    $scope.preview = {};
    $scope.preview.hideNavbar = false;

    $scope.preview.previewStates = ["cards", "icons", "test", "game","screen"];

    $scope.preview.currentCard = 0;
    $scope.getVideoURL = ggcUtil.getVideoURL;

    $scope.trust = ggcUtil.trustSVG;

    $scope.wooshSfx = ngAudio.load("../sound/digital_woosh.wav");


    $scope.printObject = ggcUtil.printObject;

    $scope.dealer = dealer
    $scope.isArray = ggcUtil.isArray;

    $scope.game = ggcGame.game;
    $scope.$watch(function(){
      return $scope.game.phase;
    }, function(val) {
      if (val == "choice") {
        $scope.wooshSfx.play();
      }
      //debugger;
    })

    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;

    if ($rootScope.kiosk == "true") {
      nwkiosk.toggleKiosk();
    }



    function bindKeys(){

      hotkeys.bindTo($scope)
        .add({
          combo: '0',
          description: 'Environment Select 1',
          callback: function(){btnHandler("environment", 0)}
        })
        .add({
          combo: '1',
          description: 'Environment Select 2',
          callback: function(){btnHandler("environment", 1)}
        })

        .add({
          combo: '2',
          description: 'Economy Select 1',
          callback: function(){btnHandler("economy", 0)}
        })
        .add({
          combo: '3',
          description: 'Environment Select 2',
          callback: function(){btnHandler("economy", 1)}
        })

        .add({
          combo: '4',
          description: 'Energy Select 1',
          callback: function(){btnHandler("energy", 0)}
        })
        .add({
          combo: '5',
          description: 'Energy Select 2',
          callback: function(){btnHandler("energy", 1)}
        })
        .add({
          combo: 'R',
          description: 'reset',
          callback: function(){
            dealer.init();
            $location.url("/game/play/attract");
            // angular.bootstrap(document, ['ggcApp']);
            //location.reload();
          }
        })
        .add({
          combo: 'M',
          description: 'Print Model',
          callback: function(){
            //console.log($scope.game);

          }
        })
        .add({
          combo: 'm',
          description: 'Pretty Print Model',
          callback: function(){
            console.log(ggcUtil.printObject($scope.game));

          }
        })
        .add({
          combo: 'd',
          description: 'Toggles developer console',
          callback: function(){
            nwkiosk.toggleDevTools();

          }
        })
        .add({
          combo: 'k',
          description: 'Tpggles kiosk mode',
          callback: function(){
            nwkiosk.toggleKiosk();

          }
        })
    }
    function btnHandler(t,i){
      if ($state.current.name == "game.play.attract") {
        ggcGame.setPanelStates("fullRetract");
        $state.go("game.play.prologue");
      } else if ($state.current.name == "game.play.prologue") {
        ggcPrologueOverlord.ended();
      }else if ($state.current.name == "game.play.loop"){
        dealer.playerChoice(t,i);
      }
    }
    bindKeys();
    //debugger;
    dealer.init();

  });
