var express = require('express');
var router = express.Router();
var path = require('path');
var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');

router.post('/:id',function(req,res){

  var collection = db.get('items');
  var wishlists = db.get('wishlists');
  collection.findOne({ _id: req.params.id},function(err, item){
      if (err) throw err;
      wishlists.insert({
          itemID:item._id,
          item_user:req.user.username
      }, function(err, wishlistItem){
          if (err) throw err;
          res.json(wishlistItem);
      });
  });
});

router.get('/',function(req,res){
  var wishlists = db.get('wishlists');
  var collection = db.get('items');
  wishlists.find({ item_user: req.user.username},function(err, items){
  if (err) throw err;
  var itemIDs=items.map(a=>a.itemID);
  if(itemIDs.length>0){
      collection.find({ _id:{$in : itemIDs }},function(err, wishItem){
        if (err) throw err;
        res.json(wishItem);
      });
    }else{
      res.status(404).end("empty wishlist");
    }
  });
});

module.exports=router;
