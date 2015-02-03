'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var CardSchema = new Schema({
	team: {type: String, default:'Pending', enum:['environment','economy','energy'], form: {type:"radio",tab:"Player" }},
	topic: {type:String, list:true, form:{tab:"Player"}},
	mainText: {type: String, form: {type: 'textarea', editor: 'ckEditor', rows:"1", tab:"Player"}},
	
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
