var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BodySchema = new Schema({
  childState: {type: String, form: {type: 'textarea', rows:1, size:"block-level"}},
  heading: {type: String, form: {type: 'textarea', rows:1, size:"block-level"}},
  subHeading: {type: String, form: {type: 'textarea', rows:1, size:"block-level"}},
  body: {type: String, form: {type: 'textarea', editor: 'ckEditor'}}
})

var ContentSchema = new Schema({
  state: {type: String, index: true, list: true},
  pages: [BodySchema]
});


var Content;
var modelName = 'Content';


Content = mongoose.model(modelName, ContentSchema);


module.exports = Content;
