var mongoose = require('mongoose'),
  Schema = mongoose.Schema,

  var itemImage = new Schema({
    productID: String,
    data: Buffer,
    contentType: String
  });


var express = require('express');
var router = express.Router();

module.exports = mongoose.model('itemImage', itemImage);
