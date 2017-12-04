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

})

module.exports=router;
