'use strict';

angular.module('ggcApp')
  .service('ggcDeck', function (ggcUtil, ggcGame, $q, $http, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    var shuffle = ggcUtil.shuffle;
    var playerNames = [];
    var decks = {};
    var game = ggcGame.game;
    var freshDecks = {};
    var clone = ggcUtil.clone;
    function init() {
      var d = $q.defer();
      freshDecks = clone($rootScope.cards);
      playerNames = $rootScope.playerNames;
      playerNames.forEach(function (k) {
        pushDeck(k);
      });
      d.resolve({playerNames: playerNames});
      return d.promise;
    };

    function pushDeck(team) {
      var playerDeck = shuffle(clone(freshDecks[team].slice(0))); //shuffle the players deck
      //if this deck doesn't exists on dealer deck, add it
      if (!decks[team]) decks[team] = [];
      //concat shuffled deck
      decks[team] = decks[team].concat(playerDeck);
    }

    function drawTwo() {
      var d = $q.defer();
      var currentCards = [];
      if (decks[game.currentPlayer].length <= 4) {
        pushDeck(game.currentPlayer);

      }
      var i = 2;


      while (i--) {
        currentCards.push(decks[game.currentPlayer].shift());

      }
      ggcGame.setCards(currentCards);
      d.resolve(currentCards);
      //call the first play phase
      //phases.choice();
      return d.promise;
    };


    return {
      init: init,
      decks: decks,
      drawTwo: drawTwo
    }
  });
