'use strict';

angular.module('ggcApp')
  .controller('GameCtrl', function ($scope, $http, hotkeys, ggcUtil, $rootScope, dealer) {
    $scope.preview = {};
    $scope.preview.hideNavbar = false;

    $scope.preview.previewStates = ["cards", "icons", "test", "game","screen"];

    $scope.preview.currentCard = 0;
    $scope.printObject = function (o) {
      return JSON.stringify(o, null, 3);
    };

    $scope.trust = ggcUtil.trustSVG;

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){

      })

    $scope.dealer = dealer;
    $scope.game = dealer.game;
    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;



    hotkeys.bindTo($scope)
      .add({
        combo: 'D',
        description: "Draw Two",
        callback: function(){
          dealer.drawTwo("economy");

        }
      })
      .add({
        combo: 'E',
        description: "Draw Two",
        callback: function(){
          dealer.drawTwo("energy");
        }
      })
      .add({
        combo: 'R',
        description: "Draw Two",
        callback: function(){
          dealer.drawTwo("environment");
        }
      })
      .add({
        combo: 'M',
        description: "Print Model",
        callback: function(){
          console.log("hands:",JSON.stringify($scope.hands,null,3), "game: ",JSON.stringify($scope.game,null,3));d
        }
      })
      .add({
        combo: 'm',
        description: "Print Model",
        callback: function () {
          console.log("game:", $scope.game);
        }

      })

  });
