'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Icon = require("./icon.js");
console.log(Icon);

var TestSchema = new Schema({
	team: {type: String, index:true, default:'Pending', enum:['environment','economy','energy'], form: {type:"radio",tab:"Foo" }},
	icons : { type: Schema.Types.ObjectId,  ref: 'Icon', form: {tab:"Baz" } } 
});
 
var Test;
var modelName = 'Test';


 Test = mongoose.model(modelName, TestSchema);


module.exports = Test;
