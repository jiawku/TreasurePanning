var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: Number,
    address: String,
    emailaddress: String,
    isDeleted: Boolean,
    isAdmin: Boolean
});

Account.plugin(passportLocalMongoose);

var express = require('express');
var router = express.Router();

module.exports = mongoose.model('Account', Account);
