var express = require('express');
var router = express.Router();
var path = require('path');
var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');
var ObjectId = require('mongodb').ObjectID;

router.post('/:id',function(req,res){
  if(req.user){
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
  }
  else{
    res.status(404).end("noSession");
  }

});


router.get('/',function(req,res){
  if(req.user){
    var wishlists = db.get('wishlists');
    var collection = db.get('items');
    wishlists.find({ item_user: req.user.username},function(err, items){
    if (err) throw err;
    var itemIDs=items.map(a=>a.itemID);
    if(itemIDs.length>0){
        collection.find({ _id:{$in : itemIDs },isDeleted:'false',status:'open'},function(err, wishItem){
          if (err) throw err;
          if (wishItem.length==0){
            res.status(404).end("empty wishlist");
          }
          else{
            res.json(wishItem);
          }

        });
      }else{
        res.status(404).end("empty wishlist");
      }
    });
  }
  else{
  res.status(404).end("noSession");
  }
});


router.get('/:id', function(req, res) {
  if(req.user){
    var wishCollection = db.get('wishlists');
    var collection = db.get('items');
    wishCollection.findOne({itemID : new ObjectId(req.params.id),item_user: req.user.username}, function(err, myresult){
      if (err) throw err;
       collection.findOne({_id: myresult.itemID},function(err, myItem){
          if (err) throw err;
          res.json(myItem);
        });
    });
  }
  else{
    res.status(404).end("noSession");
  }
});

router.delete('/:id', function(req, res){
  if(req.user){
    var collection = db.get('wishlists');
    collection.remove({itemID : new ObjectId(req.params.id),item_user: req.user.username}, function(err, data){
        if (err) throw err;
        res.json(data);
    });
  }
  else{
  res.status(404).end("noSession");
  }

});

module.exports=router;
