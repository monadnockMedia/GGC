'use strict';

angular.module('ggcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('game', {
        abstract: true,
        url: '/game',
        templateUrl: 'app/game/game.html',
        controller: 'GameCtrl'
      })
      .state('game.play', {
        url: '/play',
        views: {
          "scrim": {templateUrl: 'app/game/scrim.html'},
          "plane": {templateUrl: 'app/game/plane.html'}
        }
      })
      .state('game.play.loop', {
        url: '/loop',
        views: {
          "main@game": {templateUrl: 'app/game/main_loop.html'}
        }
      })
      .state('game.play.prologue', {
        url: '/prologue',
        views: {
          "main@game": {templateUrl: 'app/game/prologue.html'}
        }
      })
      .state('game.play.event', {
        url: '/event',
        views: {
          "main@game": {templateUrl: 'app/game/event.html'}
        }
      });
  })
