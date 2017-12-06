var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

mongoose.connect('root:root@ds243085.mlab.com:43085/treasurepanning');

var itemModel = require('../models/item.js');

var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');


router.get('/', function(req, res) {
    var collection = db.get('items');
    if(req.user && req.user.isAdmin){
      collection.find({}, function(err, items){
          if (err) throw err;
        	res.json(items);
      });
    }else{
    collection.find({isDeleted:'false',status:'open'}, function(err, items){
        if (err) throw err;
      	res.json(items);
    });}
});

 router.post('/',upload.single('image'),function(req, res){
   if(req.user){
     var newItem = new itemModel();
     var bidenddate = new Date(new Date(req.body.endBidTime).getTime()+60*60*24*1000-1000);
     newItem.name = req.body.name;
     newItem.description = req.body.description;
     newItem.category=req.body.category;
     newItem.startPrice=req.body.startPrice;
     newItem.endBidTime=bidenddate.toLocaleString("en-US");
     newItem.img.contentType=req.file.mimetype;
     newItem.img.data=fs.readFileSync(req.file.path);
     newItem.addTimeStamp=new Date().toLocaleString();
     newItem.seller=req.user.username;
     newItem.status='open';
     newItem.isDeleted='false';
     newItem.save();
     res.end("success");
   }
   else{
     res.status(404).end("noSession");
   }

});



router.get('/image/:id', function(req, res) {
    itemModel.findById(req.params.id, function (error, result) {
      res.contentType(result.img.contentType);
      res.end(result.img.data);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('items');
    collection.findOne({ _id: req.params.id},function(err, item){
        if (err) throw err;
      	res.json(item);
    });
});


router.put('/:id', function(req, res){
  itemModel.findById(req.params.id, function (err, item) {
    if (err) return handleError(err);
      item.isDeleted = 'true';
      item.save(function (err, deletedItem) {
        if (err) return handleError(err);
       res.send(deletedItem);
    });
  });
});


router.post('/:id',upload.single('image'),function(req, res){
  itemModel.findById(req.params.id, function (err, item) {
    if (err) return handleError(err);
    if(req.user){
      var bidenddate = new Date(req.body.endBidTime);
      item.name = req.body.name;
      item.description = req.body.description;
      item.category=req.body.category;
      item.startPrice=req.body.startPrice;
      item.endBidTime=bidenddate.toLocaleString();
      item.img.contentType=req.file.mimetype;
      item.img.data=fs.readFileSync(req.file.path);
      item.addTimeStamp=new Date().toLocaleString();
      item.seller=req.user.username;
      item.status='open';
      item.isDeleted='false';
      item.save(function (err, updatedItem) {
       if (err) return handleError(err);
       res.send(updatedItem);
       });
    }
    else{
      res.status(404).end("noSession");
    }

  });
});



module.exports=router;
