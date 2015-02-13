

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BodySchema = new Schema({
	text: {type: String, form: {type: 'textarea', editor: 'ckEditor'}}
})



var ScriptSchema = new Schema({
	state: {type:String, index:true, list:true},
	mainText: [BodySchema]
});

var Script;
var modelName = 'Script';


  Script = mongoose.model(modelName, ScriptSchema);


module.exports = Script;
