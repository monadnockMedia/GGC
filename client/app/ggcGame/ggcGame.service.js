'use strict';

angular.module('ggcApp')
  .service('ggcGame', function ($rootScope, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var config = $rootScope.config.game;
    var playerNames = [];
    function eachPlayer(f) {
      playerNames.forEach(f);
    }
    var self = this;
    var votes = {};
    var main = {};
    var players = {};
    var null_game = function(){return {
      main: {},
      phase: "none",
      players: {},
      currentPlayer: {},
      playerIndex: 0,
      action: {},
      round:1,
      score : {environment: {}, economy: {}, energy: {}},
      totalScore : 0
    }};
    var game = null_game();
    this.game = game;
    var null_hand = function(){return {choices: [], issue: {}}};
    function init(){

      var d = $q.defer();


      game.currentPlayer = playerNames[game.playerIndex];
      eachPlayer(function (k) {
        var init_score = config.initialScores[k];

        //var rand = ~~(Math.random() * 4 + 3);
        //rand = (k == "environment") ? Math.max(~~(rand / 4), 1) : rand;
        game.totalScore += init_score;
        game.score[k] = {i: init_score, p: 0};
        debugger;

        game.players[k] = {hand: null_hand(), docked: true, panelClass: false};
      })


      d.resolve("foo");
      return d.promise;
    }

    function setPlayerNames(pn){
      playerNames = pn;
    }

    ///reset the hands
    function buildHands() {

      debugger;
      game.main = [];
      eachPlayer(nullHand);

      function nullHand(p) {
        game.players[p].voted = false;
        game.players[p].hand = null_hand;
      }
      game.players[game.currentPlayer].hand.choices = [];
    }

    function calculatePercentage() {
      var score = game.score;
      eachPlayer(function (p) {
        score[p].p = score[p].i / self.totalScore;
      });
    }

    var phaseFunctions = {
      setup: function(){
        votes = {};
        game.totalScore = 0;
        buildHands();
      },
      choice: function(){},
      vote: function(){},
      scoring: function(){},
      event: function(){},
      endRound: function(){},
    }

    function setPhase(p){
      game.phase = p;
      phaseFunctions[p].apply();
    }

    this.init = init;
    this.setPlayerNames = setPlayerNames;
    this.setPhase = setPhase;



 /*   return{
      init: init,
      main: main,
      players: players,
      phase:phase,
      setPlayerNames: setPlayerNames,
      getCurrentPlayer: function(){return CurrentPlayer},
      currentCards: currentCards,
      playerIndex: playerIndex,
      action:action,
      phase:phase,
      round:round,
      totalScore:totalScore,
      score:score,
      phase: setPhase
    }; */



  });
