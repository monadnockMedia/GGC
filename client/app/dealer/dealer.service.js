'use strict';

angular.module('ggcApp').service('dealer', function($http, $q, $rootScope, ggcUtil) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	this.freshDecks;
	this.decks = {};
	this.teams;
	var scores = {};
	this.hands = {};
	this.game = {};
	this.game.currentPlayer;
	this.game.phase = "none";
	var currentCards;
	this.hands.main = new Array();
	this.hands.players = {};
	var self = this;
	var shuffle = ggcUtil.shuffle;
	///
	///Setup the "fresh" deck
	///
	$http.get('/api/cards/grouped').then(function(r) {
		console.log("Card Groups", r);

		self.players = Object.keys(r.data);
		self.freshDecks = r.data;

		init();
	});


	///utility functions



	function pushDeck(team) {

		var playerDeck = shuffle(self.freshDecks[team].slice(0)); //sheffle the players deck
		//if this deck doesn't exists on dealer deck, add it
		if (!self.decks[team]) self.decks[team] = new Array();
		//concat shuffled deck 
		self.decks[team] = self.decks[team].concat(playerDeck);

	}

	function init() {

		var d = {};
		//make a new set of deck, with shuffled cards
		self.players.forEach(function(k) {
			pushDeck(k);
			scores[d] = 0;
		})
		self.game.currentPlayer = self.players[0];
		console.log("deck pushed", self.decks, self.hands);
		phases.setup();
	}
	function resetHands(){
		self.players.forEach(function(k) {
			self.hands.players[k] = new Array(2);
		})
	}
	var phases = {};
	
	phases.setup = function(){
		self.game.phase = "setup";
		self.hands.main = new Array();
		self.players.forEach(function(k) {
			self.hands.players[k] = new Array(2);
		})
	}
	
	phases.choice = function() {
		console.log("PHASE CHOICE");
		self.game.phase = "choice";
		//loop through the two drawn cards
		var cPlayerCards = currentCards.map(function(c, i) {
			var copy = JSON.parse(JSON.stringify(c));
			//sneakily sort out player cards in the loop
			self.players.forEach(function(k) {
				//if this is the current player
				if (k == self.game.currentPlayer) {
					//build the choice view
					var playerEffects = copy.effects[k];
					self.hands.players[k][i] =  {
						action: playerEffects.action,
						icon: playerEffects.icon
					};
				} else {
					//otherwise, set to null
					self.hands.players[k][i] = null;
				}
			});
			delete copy.effects;
			return copy;
		})

		self.hands.main = cPlayerCards;
	}

	phases.vote = function( i ) {
		console.log("PHASE VOTE");
		self.game.phase = "vote";
		var cardChosen = currentCards[i];
		self.hands.main = null;
		
		self.players.forEach(function(k) {
			//if this is the current player
				self.hands.players[k] = new Array(2);
				//build the choice view
				var playerEffects = cardChosen.effects[k];
				self.hands.players[k][0] = playerEffects;
		
		});
	}

	///dealer methods
	//pull two cards from the deck
	this.drawTwo = function(team) {
		
		//jsut for testing;
		resetHands();
		
		currentCards = [];

		if (this.decks[team].length <= 4) {
			pushDeck(team);
		}

		var i = 2;
		var ret = [];
		while (i--) {
			currentCards.push(self.decks[team].shift());

		}
		//call the first play phase
		phases.choice();
	}

	this.choose = function(i) {
		phases.vote(i);
	}

	this.vote = function(c) {
		
		var card = c;
		var effects = c.effects;
		var keys = Object.keys(effects);
		forEach(keys, function(k) {
			var e = effects[e];
			var sc = e.primaryScore + e.secondaryScore;
			scores[k] += sc;
		});
		$rootScope.$apply();
	}

});
