'use strict';

var _ = require('lodash');
var Cards = require("../../forms-angular-models/card");
var findWithIcons = function(){return Cards.find()
	.populate('icons');}
	

	
var sortByTeam = function(_cards){
	var ret = {};
	
	_cards.forEach(function(e,i,a){
		var t = e.team;
		if(!ret[t]){
			ret[t] = new Array();
		}
		ret[t].push(e);
		
	})
	return ret;
}

var buildPlayerArray = function(deck){
	var ret = [];
	//go through the deck
	deck.forEach(function(_c,i,a){
		var card = _c;
		card.foo = "bar";
		card.players = new Array();
		var keys = Object.keys(card.effects);
		keys.shift();

		keys.forEach(function(k){

			card.players.push({
				
				"player" : k,
				effect: card.effects[k]
			})
		})

		ret.push(card);
	})
	
	return ret;
}

// Get list of cardss
exports.index = function(req, res) {
  	findWithIcons()
	.exec(function (err, _cards) {
	    if(err) { return handleError(res, err); }
	
		var cards = _cards.map(function(c){
			return c.toObject();
		})
		
	    return res.status(200).json(cards);
	  });
};


// Get list of cards, grouped by team
exports.indexGrouped = function(req, res) {
  	findWithIcons()
	.exec(function (err, _cards) {
	    if(err) { return handleError(res, err); }
	
		else{
			
			
			
		}
		var cards = _cards.map(function(c){
			return c.toObject();
		})
		var ret = sortByTeam(cards);
	    return res.status(200).json(ret);
	  });
};

// Get a single cards
exports.show = function(req, res) {
  Cards.findById(req.params.id, function (err, cards) {
    if(err) { return handleError(res, err); }
    if(!cards) { return res.status(404).send('Not Found'); }
    return res.json(cards);
  });
};

// Creates a new cards in the DB.
exports.create = function(req, res) {
  Cards.create(req.body, function(err, cards) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(cards);
  });
};

// Updates an existing cards in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cards.findById(req.params.id, function (err, cards) {
    if (err) { return handleError(res, err); }
    if(!cards) { return res.status(404).send('Not Found'); }
    var updated = _.merge(cards, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(cards);
    });
  });
};

// Deletes a cards from the DB.
exports.destroy = function(req, res) {
  Cards.findById(req.params.id, function (err, cards) {
    if(err) { return handleError(res, err); }
    if(!cards) { return res.status(404).send('Not Found'); }
    cards.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}