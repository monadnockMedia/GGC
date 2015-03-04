'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new mongoose.Schema({
  filename: String,
  size: Number
});

var Icon = require("./icon.js");


var CardSchema = new Schema({
	team: {type: String, index:true, default:'Pending', enum:['environment','economy','energy'], form: {type:"radio",tab:"Player" }},
	action: {type:String, index:true, list:true, form:{tab:"Player"}},
	mainText: {type: String, form: {type: 'textarea', editor: 'ckEditor', rows:"1", tab:"Player"}},
	icons : { type: Schema.Types.ObjectId,  ref: 'Icon', form: { tab:"Icon"} },
	effects:{
		environment:{
			primaryText: {type: String, form: {type: 'textarea', rows:4, tab:"Environment"}},
			primaryScore: {type: Number, form: {tab:"Environment"}},
			secondaryText: {type: String, form: {type: 'textarea', rows:4, tab:"Environment"}},
			secondaryScore: {type: Number, form: {tab:"Environment"}}
		},
		economy:{
			primaryText: {type: String, form: {type: 'textarea', rows:4, tab:"Economy"}},
			primaryScore: {type: Number, form: {tab:"Economy"}},
			secondaryText: {type: String, form: {type: 'textarea', rows:4, tab:"Economy"}},
			secondaryScore: {type: Number, form: {tab:"Economy"}}
		},
		energy:{
			primaryText: {type: String, form: {type: 'textarea', rows:4, tab:"Energy"}},
			primaryScore: {type: Number, form: {tab:"Energy"}},
			secondaryText: {type: String, form: {type: 'textarea', rows:4, tab:"Energy"}},
			secondaryScore: {type: Number, form: {tab:"Energy"}}
		}
	}
});

CardSchema.set('toObject', {transform:  function(d,r,o){ 
		var effects = d.effects;
		var keys = Object.keys(effects.toObject());
		r.icon = d.icons;
		
		keys.forEach(function(k){
			var e = effects[k].toObject();
			
			e.action = d.action;
			delete r.icons;
			e.icon = d.icons;
			e.player = k;
			e.text = [e.primaryText, e.secondaryText];
			e.score = e.primaryScore + e.secondaryScore;
			
		})
		r.effects = d.effects;
	
	}})

var Card;
var modelName = 'Card';


  Card = mongoose.model(modelName, CardSchema);



module.exports = Card;
