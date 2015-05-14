'use strict';
/*
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
*/
angular.module('ggcApp')
  .config(function (stateHelperProvider) {
   stateHelperProvider
     .state({
       name: "game",
       url: '/game',
       abstract:true,
       templateUrl: 'app/game/game.html',
       controller: 'GameCtrl',
       children: [
         {
           name: "play",
           url: '/play',
           views: {
             "scrim": {templateUrl: 'app/game/scrim.html'},
             "plane": {templateUrl: 'app/game/plane.html'},
             "background" : {templateUrl: 'app/game/background.html'}
           },
           children: [
             {
               name: "loop",
               url: '/loop',
               views: {
                 "main@game": {templateUrl: 'app/game/main_loop.html'}
               }
             },
             {
               name: "prologue",
               url: '/prologue',
               views: {

                 "vid@game": {templateUrl: 'app/game/prologue.html'}
               },
               children:[
                 {
                   name: "cards",
                   url: "/cards",
                   views: {
                     "main@game": {templateUrl: 'app/game/main_loop.html'},
                   },
                 }

               ]
             },
             {
               name: "event",
               url: '/event',
               views: {
                 "main@game": {templateUrl: 'app/game/event.html'}
               }

             },
             {
               name: "endgame",
               url: '/endgame',
               views: {
                 "main@game": {templateUrl: 'app/game/end.html'}
               }

             }
           ]

         }
       ]
     })
  })
