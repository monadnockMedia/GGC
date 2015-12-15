'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    text: {type: String, form: {type: 'textarea', rows: 2}}
  }, {_id: false}
);

var HintSchema = new Schema({
  phase: {type: String, required:true, index:true, default:'Pending', enum:['choice','vote','warn', 'scoring', 'event'], form: {type:"select"}},
  hints: [ItemSchema]
});


var Hint;
var modelName = 'Hint';

Hint = mongoose.model(modelName, HintSchema);

module.exports = Hint;
