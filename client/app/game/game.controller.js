'use strict';

angular.module('ggcApp')
  .controller('GameCtrl', function ($scope, $http, ngAudio, ggcUtil, $rootScope, dealer, hotkeys, $location, $interval) {
    $scope.preview = {};
    $scope.preview.hideNavbar = false;

    $scope.preview.previewStates = ["cards", "icons", "test", "game","screen"];

    $scope.preview.currentCard = 0;
    $scope.getVideoURL = ggcUtil.getVideoURL;

    $scope.trust = ggcUtil.trustSVG;

    //TODO(Ray) move loading/playing to service


    $scope.wooshSfx = ngAudio.load("../sound/digital_woosh.wav");


    $scope.printObject = ggcUtil.printObject;

    $scope.dealer = dealer;
    $scope.game = dealer.game;
    $scope.$watch(function(){
      return $scope.game.phase;
    }, function(val) {
      if (val == "choice") {
        $scope.wooshSfx.play();
      }
      //debugger;
    })

    $scope.$watch(function(){
      return $scope.dealer.prologue;
    }, function(val) {
      if (val == true) {
        $interval(function() {
          $scope.dealer.prologue = false;
          $scope.dealer.signIn = false;
        }, 20000);
      }
      //debugger;
    })

    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;



    bindKeys();

    function bindKeys(){

      hotkeys.bindTo($scope)
        .add({
          combo: '1',
          description: 'Environment Select 1',
          callback: function(){
            if ($scope.game.phase == "choice") {

            } else if ($scope.game.phase == "vote") {

            }
            dealer.playerChoice("environment",0);


            //$scope.confirmSfx.restart();
          }

        })
        .add({
          combo: '2',
          description: 'Environment Select 2',
          callback: function(){
            if ($scope.game.phase == "choice") {

            } else if ($scope.game.phase == "vote") {

            }
            dealer.playerChoice("environment",1);

          }
        })

        .add({
          combo: '3',
          description: 'Economy Select 1',
          callback: function(){
            if ($scope.game.phase == "choice") {

            } else if ($scope.game.phase == "vote") {

            }
            dealer.playerChoice("economy",0);

          }
        })
        .add({
          combo: '4',
          description: 'Environment Select 2',
          callback: function(){
            if ($scope.game.phase == "choice") {

            } else if ($scope.game.phase == "vote") {

            }
            dealer.playerChoice("economy",1);

          }
        })

        .add({
          combo: '5',
          description: 'Energy Select 1',
          callback: function(){
            if ($scope.game.phase == "choice") {

            } else if ($scope.game.phase == "vote") {

            }
            dealer.playerChoice("energy",0)

            ;

          }
        })
        .add({
          combo: '6',
          description: 'Energy Select 2',
          callback: function(){
            if ($scope.game.phase == "choice") {

            } else if ($scope.game.phase == "vote") {

            }
            dealer.playerChoice("energy",1);

          }
        })
        .add({
          combo: 'R',
          description: 'reset',
          callback: function(){
            dealer.init();
            $location.url("/game/play/prologue");
            // angular.bootstrap(document, ['ggcApp']);
            location.reload();
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
    }
  });
