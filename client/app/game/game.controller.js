'use strict';

angular.module('ggcApp')
  .controller('GameCtrl', function ($scope, $http, ggcUtil, $rootScope, dealer) {
    $scope.preview = {};
    $scope.preview.hideNavbar = false;

    $scope.preview.previewStates = ["cards", "icons", "test", "game","screen"];

    $scope.preview.currentCard = 0;


    $scope.trust = ggcUtil.trustSVG;


    $scope.dealer = dealer;
    $scope.game = dealer.game;
    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;


  });
