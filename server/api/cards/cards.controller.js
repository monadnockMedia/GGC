'use strict';

var _ = require('lodash');
var Cards = require("../../forms-angular-models/card");

// Get list of cardss
exports.index = function(req, res) {
  Cards.find()
	.populate('icons')
	.exec(function (err, cardss) {
	    if(err) { return handleError(res, err); }
	    return res.status(200).json(cardss);
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