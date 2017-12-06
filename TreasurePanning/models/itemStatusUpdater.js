var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('root:root@ds243085.mlab.com:43085/treasurepanning');

var itemModel = require('./item.js');

var express = require('express');
var router = express.Router();

exports.update =function (){


      itemModel.find({}).stream()
       .on('data', function(item){
           if (new Date(item.endBidTime)< new Date()){
             console.log(item._id);
             console.log(item.status);
             item.set('status','closed');
             item.save(function(err){});
             console.log(item.status);
           }
      })
      .on('error', function(error) {
          throw error;
      })
      .on('end', function() {
          // final callback
      });
  }
