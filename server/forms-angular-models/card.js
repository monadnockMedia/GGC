'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new mongoose.Schema({
  filename: String,
  size: Number
});

var Icon = require("./icon.js");
console.log(Icon);

var CardSchema = new Schema({
	team: {type: String, index:true, default:'Pending', enum:['environment','economy','energy'], form: {type:"radio",tab:"Player" }},
	topic: {type:String, index:true, list:true, form:{tab:"Player"}},
	icon: {type: String, form: {type: 'textarea', tab:"Player", rows:20, help: "Copy and pase contents of .svg file here."}},
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

var Card;
var modelName = 'Card';


  Card = mongoose.model(modelName, CardSchema);


module.exports = Card;
