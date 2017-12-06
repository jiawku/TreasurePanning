var express = require('express');
var router = express.Router();

var path = require('path');


var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');


router.get('/buying/', function(req, res) {
  if(req.user){
    var collection = db.get('bids');
    collection.find({bider: req.user.username,"isDeleted":"false"}, function(err, bids){
        if (err) throw err;
        console.log(bids);
        var itemIDs=bids.map(a=>a.itemID)
        itemIDs=itemIDs.filter(function(elem, pos) {
            return itemIDs.indexOf(elem) == pos;
        });
        console.log(itemIDs);
        if(itemIDs.length>0){
          var itemsCollection = db.get('items');
            itemsCollection.find({ _id:{$in : itemIDs }},function(err, buyingItem){
              if (err) throw err;
              res.json(buyingItem);
            });
          }else{
            res.status(404).end("empty buyingHistory");
          }
        });
  }
  else{
  res.status(404).end("noSession");
  }
});

router.get('/selling/', function(req, res) {
  if(req.user){
    var collection = db.get('items');
    collection.find({seller: req.user.username,"isDeleted":"false"}, function(err, items){
        if (err) throw err;
        if(items.length>0){
          res.json(items);
        }else{
          res.status(404).end("empty sellingHistory");
        }
    });
  }
  else{
    res.status(404).end("noSession");
  }
});

module.exports = router;
