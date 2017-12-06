var express = require('express');
var router = express.Router();

var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('root:root@ds243085.mlab.com:43085/treasurepanning');

var bidSchema = new Schema({
  bider:String,
  itemID : String,
  bidPrice: Number,
  bidtime: String,
  isDeleted: String
});

var bidModel = mongoose.model('bid',bidSchema);

var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');


router.get('/', function(req, res) {
    var collection = db.get('bids');
    collection.find({"isDeleted":"false"}, function(err, bids){
        if (err) throw err;
      	res.json(bids);
    });
});


router.get('/item/:id', function(req, res) {
    var collection = db.get('bids');
    collection.find({itemID: req.params.id,"isDeleted":"false"}, function(err, bids){
        if (err) throw err;
      	res.json(bids);
    });
});

router.get('/user/', function(req, res) {
  if(req.user){
    var collection = db.get('bids');
    collection.find({bider: req.user.username,"isDeleted":"false"}, function(err, bids){
        if (err) throw err;
        res.json(bids);
    });
  }
  else{
    res.status(404).end("noSession");
  }

});

 router.post('/',function(req, res){
   if(req.user){
     var newBid = new bidModel();

     newBid.bider=req.user.username,
     newBid.itemID= req.body.itemID,
     newBid.bidPrice= req.body.bidPrice,
     newBid.bidtime=new Date().toLocaleString("en-US");
     newBid.isDeleted='false';
     newBid.save();
     res.json({"status":"success"});
   }
   else{
    res.status(404).end("noSession");
   }
});

module.exports=router;
