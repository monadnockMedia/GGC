'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var positionSchema = new mongoose.Schema({
  position: {type: String, form: {type: 'textarea', rows:1}}
});


var IconSchema = new Schema({
	action: {type:String, index:true, list:true},
	team: {type: String, index:true, default:'Pending', enum:['environment','economy','energy'], form: {type:"radio" }},
	icon: {type: String, form: {type: 'textarea', rows:20, help: "Copy and paste contents of .svg file here."}},
	position: [{type: String, form: {type: 'textarea', rows:4}}],

});

var Icon;
var modelName = 'Icon';


  Icon = mongoose.model(modelName, IconSchema);


module.exports = Icon;
