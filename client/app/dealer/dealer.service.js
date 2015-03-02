'use strict';

angular.module('ggcApp')
  .service('dealer', function ($http, $q, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		this.freshDecks;
		this.decks = {};
		this.teams;
		var scores = {};
		
		var self = this;
		
	///
	///Setup the "fresh" deck
	///
		 $http.get('/api/cards/grouped').then(function(r){
			console.log("Card Groups", r);
		
			self.players = Object.keys(r.data);
			self.freshDecks=createPlayerArray(r.data);
			
			initDecks();
		}); 
		
		
	///utility functions
		function createPlayerArray(decks){
			
			self.players.forEach(function(pa){
				
				var deck = decks[pa];
				deck.forEach(function(card){
					card.players = [];
					self.players.forEach(function(pb){
							var effect = card.effects[pb];
							effect.player = pb;
							card.players.push(effect);
					})
				})
				
			
				
			})
			return decks;
			
		}
		
		function shuffle(array) {
		  var copy = [], n = array.length, i;

		  // While there remain elements to shuffle…
		  while (n) {

		    // Pick a remaining element…
		    i = Math.floor(Math.random() * array.length);

		    // If not already shuffled, move it to the new array.
		    if (i in array) {
		      copy.push(array[i]);
		      delete array[i];
		      n--;
		    }
		  }

		  return copy;
		}
		function pushDeck(team){
		
			var playerDeck = shuffle(self.freshDecks[team].slice(0)); //sheffle the players deck
			//if this deck doesn't exists on dealer deck, add it
			if(!self.decks[team]) self.decks[team] = new Array();
			//concat shuffled deck 
			self.decks[team] = self.decks[team].concat(playerDeck);
		
		}
		
		function initDecks(){
			
			var d = {};
			//make a new set of deck, with shuffled cards
			
			self.players.forEach(function(k){
				pushDeck(k);
				scores[d] = 0;
			})
			console.log("deck pushed", self.decks);
		}

	///dealer methods
		this.drawTwo = function(team){
			var dfd = $q.defer();
			if(this.decks[team].length <= 2 ){

				pushDeck(team);
			}	
			var i = 2;
			var ret = [];
			while(i--) ret.push(self.decks[team].shift());
			dfd.resolve(ret);
			return dfd.promise;	
		}

		
		this.vote = function(c){
			
			var card = c;
			var effects = c.effects;
			var keys = Object.keys(effects);
			forEach(keys, function(k){
				var e = effects[e];
				var sc = e.primaryScore + e.secondaryScore;
				scores[k] += sc;	
			});
			$rootScope.$apply();	
		}
	
  });
