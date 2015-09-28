'use strict';
var app = angular.module('ggcApp')
  .config(function (stateHelperProvider) {
   stateHelperProvider
     .state({
       name: "game",
       url: '/game',
       abstract:true,
       templateUrl: 'app/game/game.html',
       controller: 'GameCtrl',
       resolve:{
         _game: function(dealer){
           return dealer.init();
         }
       },
       children: [
         {
           name: "play",
           url: '/play',
           views: {
             "scrim": {templateUrl: 'app/game/scrim.html'},
             "plane": {templateUrl: 'app/game/plane.html'},
             "panels" : {templateUrl: 'app/game/panels.html'},
             "background" : {templateUrl: 'app/game/background.html'}
           },
           children: [
             {
               name: "attract",
               url: '/attract',
               views: {
                 "vid@game": {templateUrl: 'app/game/attract.html'},
                 "panels@game": {templateUrl: 'app/game/attractPanels.html'},
               }
             },
             {
               name: "loop",
               url: '/loop',
               views: {
                 "vid@game": {template: ''},
                 "main@game": {templateUrl: 'app/game/main_loop.html'}
               }
             },
             {
               name: "warn",
               url: '/warn',
               views: {
                 "main@game": {templateUrl: 'app/game/warn.html'}
               }
             },
             {
               name: "prologue",
               url: '/prologue',
               views: {
                 "vid@game": {templateUrl: 'app/game/prologue.html'},
                 "panels@game": {templateUrl: 'app/game/prologuePanels.html'},

               },
               children:[
                 {
                   name: "cards",
                   url: "/cards",
                   views: {
                     "main@game": {templateUrl: 'app/game/main_loop.html'},
                     "panels@game" : {templateUrl: 'app/game/panels.html'},
                   },
                 }

               ]
             },
             {
               name: "tutorial",
               url: '/tutorial',
               views: {
                 "tutorial@game": {templateUrl: 'app/game/tutorial.html', controller:"TutorialCtrl"},
                 "panels@game": {templateUrl: 'app/game/prologuePanels.html'}
               },
               children:[
                 {
                   name: "cards",
                   url: "/cards",
                   views: {
                     "main@game": {templateUrl: 'app/game/main_loop.html'},
                     "panels@game" : {templateUrl: 'app/game/panels.html'},
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
