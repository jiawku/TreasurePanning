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
    var collection = db.get('bid');
    collection.find({isDeleted:'false'}, function(err, bids){
        if (err) throw err;
      	res.json(bids);
    });
});

 router.post('/',function(req, res){
        var newBid = new bidModel();

        newBid.bider=req.user.username,
        newBid.itemID= req.body.itemID,
        newBid.bidPrice= req.body.bidPrice,
        newBid.bidtime=new Date().toLocaleString();
        newBid.isDeleted='false';
        newBid.save();
        res.end("success");
    }
);




// router.get('/:id', function(req, res) {
//     var collection = db.get('items');
//     collection.findOne({ _id: req.params.id},function(err, item){
//         if (err) throw err;
//       	res.json(item);
//     });
// });
//
//
// router.put('/:id', function(req, res){
//   itemModel.findById(req.params.id, function (err, item) {
//     if (err) return handleError(err);
//       item.isDeleted = 'true';
//       item.save(function (err, deletedItem) {
//         if (err) return handleError(err);
//        res.send(deletedItem);
//     });
//   });
// });


module.exports=router;
