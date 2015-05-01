var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EndSchema = new Schema({
  balanced: {type: Boolean,list:true,},
  team: {type: String, index:true,list:true, default:'Pending', enum:['environment','economy','energy','N/A'], form: {type:"radio"}},
  mainText: {type: String, form: {type: 'textarea', rows:1, size:"block-level"}},
  additionalText: {type: String, form: {type: 'textarea', rows:1, size:"block-level"}}
})




var Ending;
var modelName = 'Ending';


Ending = mongoose.model(modelName, EndSchema);


module.exports = Ending;
