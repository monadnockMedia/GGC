'use strict';

angular.module('ggcApp')
  .controller('GameCtrl', function ($scope, $http, ngAudio, ggcUtil, $rootScope, dealer, hotkeys, $location) {
    $scope.preview = {};

    $scope.preview.hideNavbar = false;

    $scope.preview.previewStates = ["cards", "icons", "test", "game","screen"];

    $scope.preview.currentCard = 0;
    $scope.getVideoURL = ggcUtil.getVideoURL;

    $scope.trust = ggcUtil.trustSVG;

    //TODO(Ray) move loading/playing to service
    $scope.confirmSfx = ngAudio.load("../sound/confirm.wav");
    $scope.votePassSfx = ngAudio.load("../sound/vote_pass.wav");
    $scope.voteBlockSfx = ngAudio.load("../sound/vote_block.wav");
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

    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;



    bindKeys();

    function bindKeys(){

      hotkeys.bindTo($scope)
        .add({
          combo: '0',
          description: 'Environment Select 1',
          callback: function(){
            if ($scope.game.phase == "choice") {
              $scope.confirmSfx.play();
            } else if ($scope.game.phase == "vote") {
              $scope.voteBlockSfx.play();
            }
            dealer.playerChoice("environment",0);


            //$scope.confirmSfx.restart();
          }

        })
        .add({
          combo: '1',
          description: 'Environment Select 2',
          callback: function(){
            if ($scope.game.phase == "choice") {
              $scope.confirmSfx.play();
            } else if ($scope.game.phase == "vote") {
              $scope.votePassSfx.play();
            }
            dealer.playerChoice("environment",1);

          }
        })

        .add({
          combo: '2',
          description: 'Economy Select 1',
          callback: function(){
            if ($scope.game.phase == "choice") {
              $scope.confirmSfx.play();
            } else if ($scope.game.phase == "vote") {
              $scope.voteBlockSfx.play();
            }
            dealer.playerChoice("economy",0);

          }
        })
        .add({
          combo: '3',
          description: 'Environment Select 2',
          callback: function(){
            if ($scope.game.phase == "choice") {
              $scope.confirmSfx.play();
            } else if ($scope.game.phase == "vote") {
              $scope.votePassSfx.play();
            }
            dealer.playerChoice("economy",1);

          }
        })

        .add({
          combo: '4',
          description: 'Energy Select 1',
          callback: function(){
            if ($scope.game.phase == "choice") {
              $scope.confirmSfx.play();
            } else if ($scope.game.phase == "vote") {
              $scope.voteBlockSfx.play();
            }
            dealer.playerChoice("energy",0);

          }
        })
        .add({
          combo: '5',
          description: 'Energy Select 2',
          callback: function(){
            if ($scope.game.phase == "choice") {
              $scope.confirmSfx.play();
            } else if ($scope.game.phase == "vote") {
              $scope.votePassSfx.play();
            }
            dealer.playerChoice("energy",1);

          }
        })
        .add({
          combo: 'R',
          description: 'reset',
          callback: function(){
           $location.url("/game/play/prologue");

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
