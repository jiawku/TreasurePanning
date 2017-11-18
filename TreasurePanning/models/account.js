var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
});

Account.plugin(passportLocalMongoose);

var express = require('express');
var router = express.Router();

module.exports = mongoose.model('Account', Account);
