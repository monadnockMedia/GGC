'use strict';

angular.module('ggcApp').service('dealer', function($http, $q, $rootScope, ggcUtil, $interval) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	this.freshDecks;
	this.decks = {};
	this.teams;

	this.game = {main:{}, players:{}, currentPlayer:{}, playerIndex:0};
	this.game.score = {};
	this.game.phase = "none";
	var chosenCard;
	var currentCards;
	var self = this;

	var shuffle = ggcUtil.shuffle;
	console.log("DEALER");
	///
	///Setup the "fresh" deck
	///
	$http.get('/api/cards/grouped').then(function(r) {
		self.players = Object.keys(r.data);
		self.freshDecks = r.data;

		init();
	});


///utility functions

	///initialize
	function init() {

		//make a new set of deck, with shuffled cards
		self.game.totalScore = 0;

    //setup the game by players
		eachPlayer(function(k){
			pushDeck(k);
			var rand = ~~(Math.random()*4+3);
			self.game.totalScore += rand;
			self.game.score[k]= {i:rand,p:0};
			self.game.players[k] = { hand:{choices:[],issue:{}}, docked:true};
		})

		calculatePercentage();
		setCurrentPlayer(self.game.playerIndex);
		console.log("deck pushed", self.decks, self.hands);
		phases.setup();
	}

	function calculatePercentage(){
		var score = self.game.score;
		eachPlayer(function(p){
			score[p].p = score[p].i/self.game.totalScore;
		});
	}

	function nextPlayer(){
		var i = self.game.playerIndex;
		self.game.playerIndex = (i == 2 ) ? 0 : i+1;
		setCurrentPlayer(self.game.playerIndex );
	}

	function eachPlayer( f ){
		self.players.forEach(f);
	}

	function setCurrentPlayer( i ){
		var p = self.players[i];
		self.game.currentPlayer = p;
		eachPlayer(function(pp){
			self.game.players[pp].currentPlayer = self.game.players[pp].docked = (pp==p);
		})
	}

	///reset the hands
	function buildHands( player ){
		self.game.main = [];

		eachPlayer(nullHand);

		function nullHand(p){
      self.game.players[p].voted = false;
			self.game.players[p].hand = {
				choices: null,
				issue: null
			}
		}

		self.game.players[player].hand.choices = [];
	}

	///add a shuffled deck to the "bottom"
	function pushDeck(team) {
		var playerDeck = shuffle(self.freshDecks[team].slice(0)); //sheffle the players deck
		//if this deck doesn't exists on dealer deck, add it
		if (!self.decks[team]) self.decks[team] = new Array();
		//concat shuffled deck
		self.decks[team] = self.decks[team].concat(playerDeck);
	}

	///Score
	function tally(){

		var score = self.game.score;

		eachPlayer(function(p){
			score[p].i += chosenCard.effects[p].score;
			self.game.totalScore += score[p].i;
		});

		calculatePercentage();
	}

///Phases
	var phases = {};

	phases.setup = function(){
		self.game.phase = "setup";
    self.game.votes = {};
    self.game.totalScore = 0;
		buildHands(self.game.currentPlayer);
		self.drawTwo(self.game.currentPlayer);
	}

	phases.choice = function() {
		self.game.phase = "choice";

		console.log("PHASE CHOICE");
		//loop through the two drawn cards
		var cPlayerCards = currentCards.map(function(c, i) {
			var copy = JSON.parse(JSON.stringify(c));
			//sneakily sort out player cards in the loop
			eachPlayer(function(k) {
				//if this is the current player
				if (k == self.game.currentPlayer) {
					//build the choice view
					var playerEffects = copy.effects[k];
					self.game.players[k].hand.choices[i] =  {
						action: playerEffects.action,
						icon: playerEffects.icon
					};
				}
			});
			delete copy.effects;
			return copy;
		})
		self.game.main = cPlayerCards;
	}

	phases.vote = function( i ) {
		self.game.phase = "vote";

		console.log("PHASE VOTE");
		chosenCard = currentCards[i];
		self.game.main = [];
		eachPlayer(function(k) {
			var playerEffects = chosenCard.effects[k];
			self.game.players[k].hand.issue = playerEffects;
      self.game.players[k].docked = false;
		});
	}

	phases.scoring = function( passed ){
		self.game.phase = "scoring";
		if(passed) tally();
		nextPlayer();
		var timer = $interval(function(){
			$interval.cancel(timer);
			phases.setup();
		}, 2000);
	}

///dealer methods
	//pull two cards from the deck
	this.drawTwo = function(team) {
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

	///currentPlayer Chooses an issue
	this.choose = function(i) {
		phases.vote(i);
	}

	///each player votes
	this.vote = function(p, v) {
		self.game.votes[p] = v;
    self.game.players[p].voted = true;
		var keys = Object.keys(self.game.votes);

		if(keys.length == 3){
			var i = 3;
			var ct = 0;
			while(i--){
				ct+=self.game.votes[keys[i]];
			}
			var passed = (ct>=2);
			console.log(
				(passed) ? "PASSED" : "FAILED", ct
			);
			phases.scoring(passed);
		}
	}

});
