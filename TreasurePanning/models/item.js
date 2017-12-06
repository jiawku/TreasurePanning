var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  description : String,
  category : String,
  startPrice: Number,
  endBidTime: String,
  img:{contentType:String,
    data:Buffer},
  addTimeStamp: String,
  seller: String,
  status: String,
  isDeleted: String
});

module.exports = mongoose.model('Item', itemSchema);
